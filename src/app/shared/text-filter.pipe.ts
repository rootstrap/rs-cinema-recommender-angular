import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'textFilter'
})
    
export class TextFilterPipe implements PipeTransform{
    transform(items: any[], filterText: string): any[] {
        if (!items) {
            return [];
        }
        if (!filterText) {
            return items;
        }
        filterText = filterText.toLocaleLowerCase();
    
        return items.filter(({title}) => {
            return title.toLocaleLowerCase().includes(filterText);
        });
    }
}
