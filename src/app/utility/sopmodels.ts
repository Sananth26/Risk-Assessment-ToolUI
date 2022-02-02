import { ListofColumnNames } from './model';

export class TemplateForSop {
     id: number;
    templateName: string;
    templateStructure: any;
    activeFlag: string;
    deleteFlag: string;
    tableContent: any;
}

export class TemplateNameDTO{
    id: number;
    templateName: string;
}

export class TableForTemplate{
    tableAvailable: boolean;
    tableActiveFlag: boolean;
    columnNameList: Array<ListofColumnNames>;
}