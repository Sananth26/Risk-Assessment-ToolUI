import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

    transform( array: any[], query: string ): any {
        if ( query ) {
            return _.filter( array, row => 
            (row.requestSno.toLowerCase().indexOf( query.toLowerCase() )> -1 ||
            row.status.toLowerCase().indexOf( query.toLowerCase() )> -1 ||
            row.assignedto.toLowerCase().indexOf( query.toLowerCase() )> -1 ||
            row.categoryname.toLowerCase().indexOf( query.toLowerCase() )> -1));
        }
        return array;
    }

}
