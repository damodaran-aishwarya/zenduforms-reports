import { Component, computed, signal , inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReportsService, Report } from '../../services/reports';
import { MatMenuModule } from '@angular/material/menu';

type SortKey = 'newest' | 'oldest' | 'name';

@Component({
  selector: 'app-all-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './all-reports.html',
  styleUrl: './all-reports.scss'
})
export class AllReportsComponent {
  readonly Math = Math;

  // UI state
  searchText = signal('');
  sortBy = signal<SortKey>('newest');
  pageSize = 5;
  pageIndex = signal(0);

  // data
  private raw = signal<Report[]>([]);
  private reports = inject(ReportsService);
  
onSearch(value: string) {
  this.searchText.set(value);
  this.pageIndex.set(0);
}
trackByReportId = (_: number, r: Report) => r.id;
readonly filtered = computed(() => {
  const term = this.searchText().trim().toLowerCase();
  const s = this.sortBy();
  let rows = this.raw();

  if (term) {
    rows = rows.filter(r =>
      r.name.toLowerCase().includes(term) ||
      r.owner.toLowerCase().includes(term) ||
      r.form.toLowerCase().includes(term)
    );
  }

  switch (s) {
    case 'newest':
      rows = [...rows].sort((a : Report, b: Report) => this.toTime(b.createdAt) - this.toTime(a.createdAt));
      break;
    case 'oldest':
      rows = [...rows].sort((a : Report, b: Report) => this.toTime(a.createdAt) - this.toTime(b.createdAt));
      break;
    case 'name':
      rows = [...rows].sort((a : Report, b: Report) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      );
      break;
  }

  return rows;
});

// 4) (optional) clamp page when results shrink
private clampPage() {
  const max = Math.max(0, Math.ceil(this.total() / this.pageSize) - 1);
  if (this.pageIndex() > max) this.pageIndex.set(max);
}

// wherever you update data (delete/search), call clampPage()
delete(r: Report) {
  if (confirm(`Delete report "${r.name}"?`)) {
    this.raw.set(this.raw().filter(x => x.id !== r.id));
    this.clampPage();
  }
}


  readonly total = computed(() => this.filtered().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize)));
  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i)); // 0-based

  readonly pageSlice = computed(() => {
    const start = this.pageIndex() * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  constructor() {
    this.reports.list().subscribe((data: Report[]) => this.raw.set(data));
  }

setSort(by: SortKey) {
  this.sortBy.set(by);   // was: this.sortBy = by;
  this.pageIndex.set(0);
}
private toTime(d: string | Date | null | undefined): number {
  if (!d) return 0;
  if (d instanceof Date) {
    const t = d.getTime();
    return Number.isFinite(t) ? t : 0;
  }

  const t = Date.parse(d);
  return Number.isFinite(t) ? t : 0;
}

readonly sortText = computed(() => {
  const s = this.sortBy();
  return s === 'newest' ? 'Newest' : s === 'oldest' ? 'Oldest' : 'Name';
});
  goTo(page: number) {
    if (page >= 0 && page < this.totalPages()) this.pageIndex.set(page);
  }

  prevPage() { this.goTo(this.pageIndex() - 1); }
  nextPage() { this.goTo(this.pageIndex() + 1); }

  // actions
  edit(r: Report) { alert(`Edit "${r.name}"`); }
  
}
