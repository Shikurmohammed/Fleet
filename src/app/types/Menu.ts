export interface Menu {
    id?:number,
    name?: string;//Name/Label of the menu item
    url?: string;//The path we pass for the routerLink attribute
    icon?: string;
    query_param?:any;
    parent_id?:number;
    order_index?:number;
    roles?:string[];
    subMenu?:Menu[];
    isDelegated?:number;
    delegatedRoles?: string[]; // Roles that have delegated access to this menu item


  }
