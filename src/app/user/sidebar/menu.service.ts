import { Injectable } from "@angular/core";
import { Menu } from "src/app/types/Menu";

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuItems: Menu[] = [
    //Dashboards
    {
      id: 1,
      name: 'Dashboard',
      url: '/adminhome',
      roles: ['Admin'],
      icon: 'dashboard'
    },

    {
      id: 2,
      name: 'Dashboard',
      url: '/mechanicHome',
      roles: ['GS Mechanic'],
      icon: 'dashboard'
    },
    {
      id: 1,
      name: 'Dashboard',
      url: '/authorizeRequest',
      roles: ['Request Authorizer'],
      icon: 'dashboard'
    },
    {
      id: 1,
      name: 'Dashboard',
      url: '/requesthome',
      roles: ['Requester'],
      icon: 'dashboard'
    },
    {
      id: 1,
      name: 'Dashboard',
      url: '/dispatcherhome',
      roles: ['Dispatcher'],
      icon: 'dashboard'
    },
    {
      id: 1,
      name: 'Dashboard',
      url: '/officerHome',
      roles: ['Senior Transport Officer'],
      icon: 'dashboard'
    },

    {
      id: 1,
      name: 'Dashboard',
      url: '/technicalHome',
      roles: ['Technical Service'],
      icon: 'dashboard'
    },
    {
      id: 1,
      name: 'Dashboard',
      url: '/gsauthorizerHome',
      roles: ['GS Approver'],
      icon: 'dashboard'
    },
    {
      id: 1,
      name: 'Dashboard',
      url: '/settlementHome',
      roles: ['SettlementOfficers'],
      icon: 'dashboard'
    },
    //End of Dashboard Routes

    //Admin Routes
    {
      id: 3,
      name: 'User Management',
      roles: ['Admin'],
      icon: 'people',
      subMenu: [
        // { id: 4, name: 'New user', url: '/user', roles: ['Admin'], icon: 'add_circle' },
        { id: 5, name: 'Manage User', url: '/manageuser', roles: ['Admin'], icon: 'settings' },
        { id: 6, name: ' Advance Approver', url: '/mappapprover', roles: ['Admin'], icon: 'settings' },
        { id: 7, name: ' Report', url: '/userProfileListing', roles: ['Admin'], icon: 'summarize' }

      ]
    },
    //End of Admin Routes

    //Requester Routes
    {
      id: 8,
      name: 'Request',
      roles: ['Requester'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 9, name: 'In City', url: '/incityRequest', roles: ['Requester'], icon: 'people' },
        { id: 10, name: 'Off time', url: '/offtimeRequest', roles: ['Requester'], icon: 'settings' },
        { id: 11, name: 'Field', url: '/vehicleFieldRequest', roles: ['Requester'], icon: 'settings' },

      ]
    },
    {
      id: 12,
      name: 'My Request',
      roles: ['Requester'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 13, name: 'In City', url: '/viewincityrequest', roles: ['Requester'], icon: 'people' },
        { id: 14, name: 'Off time', url: '/manageofftimerequest', roles: ['Requester'], icon: 'settings' },
        { id: 15, name: 'Field', url: '/myfieldrequest', roles: ['Requester'], icon: 'settings' },

      ]
    },
    //Request Delegation menu
    {
      id: 16,
      name: 'Authorize',
      roles: ['Requester'],
      icon: 'admin_panel_settings',
      isDelegated: 1,
      delegatedRoles: ['Requester'],
      subMenu: [
        {
          id: 17, name: 'Authorize Incity', url: '/authorizeIncityRequest', roles: ['Requester'], icon: 'people', isDelegated: 1,
          delegatedRoles: ['Requester'],
        },
        {
          id: 18, name: 'Authorize Offtime', url: '/authorizeOfftimeRequest', roles: ['Requester'], icon: 'settings', isDelegated: 1,
          delegatedRoles: ['Requester'],
        },
        {
          id: 19, name: 'Authorize Field', url: '/authorizeFieldRequest', roles: ['Requester'], icon: 'settings', isDelegated: 1,
          delegatedRoles: ['Requester'],
        },

      ]
    },
    // Custodian Vehicle Request Menu
    {
      id: 20,
      name: 'Maintainance Request',
      roles: ['Requester'],
      icon: 'admin_panel_settings',
      subMenu: [
        {
          id: 21, name: 'Request Maintainance',
          url: '/maintenanceRequest', roles: ['Requester'], icon: 'people'
        },
        {
          id: 22, name: 'Manage Maint Request',
          url: '/custodianRequest', roles: ['Requester'], icon: 'settings'
        },
        , {
          id: 23, name: 'Report',
          url: '/MaintenanceRequestReport', roles: ['Requester'], icon: 'settings'
        },
      ]
    },
    {
      id: 24,
      name: 'Advance Payment',
      roles: ['Requester'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 25, name: 'Create', url: '/advCreate', roles: ['Requester'], icon: 'people' },
        { id: 26, name: 'Manage', url: '/advManage', roles: ['Requester'], icon: 'settings' },
      ]
    },
    //End of Requester Routes

    //Request Authorizer Routes
    {
      id: 27,
      name: ' Request Management',
      roles: ['Request Authorizer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 28, name: 'Authorize Request', url: '/authorizeRequest', roles: ['Request Authorizer'], icon: 'people' },
        { id: 29, name: 'delegate authorizer', url: '/delegateAuthorizer', roles: ['Request Authorizer'], icon: 'settings' },
      ]
    },
    {
      id: 30,
      name: 'Advance Payment',
      roles: ['Request Authorizer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 31, name: 'Authorize', url: '/authorizeAdv', roles: ['Request Authorizer'], icon: 'people' },
      ]
    },
    {
      id: 32,
      name: 'Report Management',
      roles: ['Request Authorizer'],
      icon: 'summarize',
      subMenu: [
        { id: 33, name: 'Incity Report', url: '/incityReport', roles: ['Request Authorizer'], icon: 'people' },
        { id: 34, name: 'Offtime Report', url: '/offtimeReport', roles: ['Request Authorizer'], icon: 'people' },
        { id: 35, name: 'Field Report', url: '/fieldReport', roles: ['Request Authorizer'], icon: 'people' },
      ]
    },
    //End of Request Authorizer's Routes

    //Dispatcher's Routes
    {
      id: 36,
      name: 'Dispatch',
      roles: ['Dispatcher'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 37, name: 'Incity Dispacth', url: '/incityDispatcher', roles: ['Dispatcher'], icon: 'people' },
        { id: 38, name: 'Offtime Dispacth', url: '/offtimeDispatcher', roles: ['Dispatcher'], icon: 'people' },
        { id: 39, name: 'Field Dispacth', url: '/fieldDispatcher', roles: ['Dispatcher'], icon: 'people' },

      ]
    },
    {
      id: 40,
      name: 'Modify',
      roles: ['Dispatcher'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 41, name: 'Incity Dispatched', url: '/modifyIncityDispatch', roles: ['Dispatcher'], icon: 'people' },
        { id: 42, name: 'Offtime Dispatched', url: '/modifyOfftimeDispatch', roles: ['Dispatcher'], icon: 'people' },
        { id: 43, name: 'Field Dispatched', url: '/modifyFieldDispatch', roles: ['Dispatcher'], icon: 'people' },
      ]
    },
    {
      id: 44,
      name: 'Print',
      roles: ['Dispatcher'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 45, name: 'Incity ', url: '/dispactherIncityPrint', roles: ['Dispatcher'], icon: 'people' },
        { id: 46, name: 'Offtime ', url: '/dispactherOfftimePrint', roles: ['Dispatcher'], icon: 'people' },
        { id: 47, name: 'Field ', url: '/dispactherFieldPrint', roles: ['Dispatcher'], icon: 'people' },
      ]
    },
    // Delegated Dispatcher Officer
    {
      id: 48,
      name: ' Fleet Request',
      roles: ['Dispatcher'],
      icon: 'admin_panel_settings',
      isDelegated: 1,
      delegatedRoles: ['Dispatcher'],
      subMenu: [
        {
          id: 49, name: 'Offtime ', url: '/offtimeCheck', roles: ['Dispatcher'], icon: 'people', isDelegated: 1,
          delegatedRoles: ['Dispatcher'],
        },
        {
          id: 50, name: 'Field ', url: '/fieldCheck', roles: ['Dispatcher'], icon: 'people', isDelegated: 1,
          delegatedRoles: ['Dispatcher'],
        },
      ]
    },
    //End of Delegated Dispatcher Officer
    { id: 51, name: 'Report ', url: '/dispatcherReport', roles: ['Dispatcher'], icon: 'people' },
    //End of Dispatcher's Routes

    //Transport Officer's Routes
    {
      id: 52,
      name: 'Vehicle Management',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 53, name: 'Manage Vehicle ', url: '/manageVehicle', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 54, name: 'Manage Fuel price ', url: '/updateFuelPrice', roles: ['Senior Transport Officer'], icon: 'people' },
      ]
    },
    {
      id: 55,
      name: 'Request Management',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 56, name: 'Offtime', url: '/offtimeCheck', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 57, name: 'Field', url: '/fieldCheck', roles: ['Senior Transport Officer'], icon: 'people' },
      ]
    },
    {
      id: 58,
      name: 'Driver Management',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 59, name: 'Add Driver', url: '/driverAdd', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 60, name: 'Manage Driver', url: '/manageDriver', roles: ['Senior Transport Officer'], icon: 'people' },
      ]
    },
    {
      id: 61,
      name: 'Vehicle Maintenance',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 62, name: 'Service Maintenance', url: '/serviceMillageDue', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 63, name: 'Tyres Maintenance', url: '/tyreMillageDue', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 64, name: 'Body Maintenance', url: '/maintenanceRequest', roles: ['Senior Transport Officer'], icon: 'people' },
      ]
    },
    {
      id: 65,
      name: 'Manage Main Request',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 66, name: 'Service Maintenance', url: '/officerRequest', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 67, name: 'Tyres Maintenance', url: '/officerRequest', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 68, name: 'Body Maintenance', url: '/custodianRequest', roles: ['Senior Transport Officer'], icon: 'people' },
      ]
    },
    {
      id: 69,
      name: 'Delegate Approver',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 70, name: 'Delegate', url: '/delegateOfficer', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 71, name: 'Tyres Maintenance', url: '/officerRequest', roles: ['Senior Transport Officer'], icon: 'people' },
      ]
    },
    {
      id: 72,
      name: 'Report Management',
      roles: ['Senior Transport Officer'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 73, name: 'Maintenance Report', url: '/MaintenanceRequestReport', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 74, name: 'Insurance Due Report', url: '/insuranceDue', roles: ['Senior Transport Officer'], icon: 'people' },
        { id: 75, name: 'Dispatch Listing', url: '/dispatcherReport', roles: ['Senior Transport Officer'], icon: 'people' },

      ]
    },
    //End of Transport officer's Routes

    //GS Mechanic's Routes
    {
      id: 76,
      name: 'Vehicle Management',
      roles: ['GS Mechanic'],
      icon: 'directions_car',
      subMenu: [
        { id: 77, name: 'Add Vehicle', url: '/vehicleAdd', roles: ['GS Mechanic'], icon: 'people' },
        { id: 78, name: 'Manage Vehicle', url: '/manageVehicle', roles: ['GS Mechanic'], icon: 'people' },
      ]
    },
    {
      id: 79,
      name: 'Vehicle Maintenance',
      roles: ['GS Mechanic'],
      icon: 'directions_car',
      subMenu: [
        { id: 80, name: 'Verify Requests', url: '/mechanicCustodianRequests', roles: ['GS Mechanic'], icon: 'people' },
        { id: 81, name: 'Manage Requests', url: '/mechanicRequests', roles: ['GS Mechanic'], icon: 'people' },
        { id: 82, name: 'Maint Submission', url: '/mechanicSubmission', roles: ['GS Mechanic'], icon: 'people' },

      ]
    },
    {
      id: 79,
      name: 'Reports',
      roles: ['GS Mechanic'],
      icon: 'file_copy',
      subMenu: [
        { id: 80, name: 'Unverified Requests', url: '/unverifiedMaintenanceRequest', roles: ['GS Mechanic'], icon: 'people' },
        { id: 81, name: 'Mechanic Requests', url: '/mechanicRequestReport', roles: ['GS Mechanic'], icon: 'people' },
        { id: 82, name: 'Maint. Submission', url: '/maintenanceSubmissionReport', roles: ['GS Mechanic'], icon: 'people' },

      ]
    },
    {
      id: 79,
      name: 'Authorization',
      roles: ['GS Mechanic'],
      icon: 'admin_panel_settings',
      isDelegated: 1,
      delegatedRoles: ['GS Mechanic', 'Admin'],
      subMenu: [
        {
          id: 80, name: 'Verified Requests', url: '/verifiedRequests', roles: ['GS Mechanic'], icon: 'people', isDelegated: 1,
          delegatedRoles: ['GS Mechanic'],
        },
        {
          id: 81, name: 'Maint. Completion', url: '/maintCompletionAuth', roles: ['GS Mechanic'], icon: 'people', isDelegated: 1,
          delegatedRoles: ['GS Mechanic'],
        },
      ]
    },
    //End of GS Mechanic's Routes

    //Technical Service Routes
    {
      id: 83,
      name: 'Garage Management',
      roles: ['Technical Service'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 84, name: 'Add Garage', url: '/addGarage', roles: ['Technical Service'], icon: 'people' },
        { id: 85, name: 'Manage Garage', url: '/manageGarage', roles: ['Technical Service'], icon: 'people' },
      ]
    },
    {
      id: 86,
      name: 'Vehicle Maintenance',
      roles: ['Technical Service'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 87, name: 'Requests', url: '/maintRequest', roles: ['Technical Service'], icon: 'people' },
        { id: 88, name: 'Maint. Completion', url: '/maintCompletion', roles: ['Technical Service'], icon: 'people' },
        { id: 88, name: 'Manage Completion', url: '/manageCompletion', roles: ['Technical Service'], icon: 'people' },
      ]
    },
    {
      id: 89,
      name: 'Reports',
      roles: ['Technical Service'],
      icon: 'summarize',
      subMenu: [
        { id: 90, name: 'Maintenance Cost', url: '/maintenancecostReport', roles: ['Technical Service'], icon: 'people' },
      ]
    },
    //End of Techincal Service Routes

    //GS Approver's Routes
    {
      id: 91,
      name: 'Vehicle Maintenance',
      roles: ['GS Approver'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 92, name: 'Verified Requests', url: '/verifiedRequests', roles: ['GS Approver'], icon: 'people' },
        { id: 93, name: 'Maint. Completion', url: '/maintCompletionAuth', roles: ['GS Approver'], icon: 'people' },
        { id: 94, name: 'Delegate', url: '/delegateGsauth', roles: ['GS Approver'], icon: 'people' },
      ]
    },
    {
      id: 95,
      name: 'Reports',
      roles: ['GS Approver'],
      icon: 'admin_panel_settings',
      subMenu: [
        { id: 96, name: 'Maintenance Cost', url: '/maintenancecostReport', roles: ['GS Approver'], icon: 'people' },
        { id: 97, name: 'MMaint. Requests', url: '/maintRequestReport', roles: ['GS Approver'], icon: 'people' },
        { id: 98, name: 'Maint. Completed', url: '/maintCompletionReport', roles: ['GS Approver'], icon: 'people' },
      ]
    },
    //End of GS Approver's Routes
    //Settlement Officer's Routes
    { id: 99, name: 'Advance Payment', url: '/settleAdvancePayment', roles: ['SettlementOfficers'], icon: 'people' },
    //End of Settlement officer's Routes
  ];

  constructor() { }


  getMenuItems(userRole: string, isDelegated: number): Menu[] {
    console.log("Given user role", userRole);
    return this.menuItems
      .map(item => {
        const isParentAccessible = item.roles ? item.roles.includes(userRole.trim()) : false;

        // Filter sub-menu items based on user role
        const filteredSubMenu = item.subMenu?.filter(subItem => subItem.roles?.includes(userRole.trim())) || [];
        // Check if the item is accessible based on delegation
        // Check if the item is accessible based on delegation if it has delegatedRoles
        /*If item.delegatedRoles?.includes(userRole.trim())
        is a ternory opertor to check if the item's delegatedRoles property has value which is equal to the given role
        .i.e if
        */
        const isDelegatedAccessible = item.delegatedRoles?.includes(userRole.trim()) ? isDelegated === 1 : true;
        if (item.name == "Authorization") {
          console.log("Menu Name", item.name);
          console.log("isParentAccessible", isParentAccessible);
          console.log("Has submenu?", filteredSubMenu.length);
          console.log("Delegation status", isDelegatedAccessible);
          console.log("*******************************************");
        }
        // Return the item with filtered sub-menu
        return {
          ...item,//Spread operator
          subMenu: filteredSubMenu.length > 0 ? filteredSubMenu : undefined,
          isAccessible: (isParentAccessible || filteredSubMenu.length > 0) && isDelegatedAccessible,
          isDelegatedAccessible: isDelegatedAccessible

        };

      })
      .filter(item => item.isAccessible); // Only return accessible items
  }


}
