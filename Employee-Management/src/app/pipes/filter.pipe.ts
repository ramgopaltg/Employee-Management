import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, selectedName: string, selectedCompany: string, selectedDesignation: string, selectedEmail: string): any[] {
    if (!items) return [];

    return items.filter(item => {
      const matchesSearch = !searchText || Object.values(item).join(' ').toLowerCase().includes(searchText.toLowerCase());
      const matchesName = !selectedName || item.name === selectedName;
      const matchesCompany = !selectedCompany || item.company === selectedCompany;
      const matchesDesignation = !selectedDesignation || item.designation === selectedDesignation;
      const matchesEmail = !selectedEmail || item.email === selectedEmail;

      return matchesSearch && matchesName && matchesCompany && matchesDesignation && matchesEmail;
    });
  }
}