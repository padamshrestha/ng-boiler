import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange} from 'angular2/core'
import {List} from 'immutable';
import {BusinessModel} from "../../../business/BusinesModel";
import {OrderBy} from "../../../pipes/OrderBy";
import {SIMPLEGRID_DIRECTIVES, ISimpleGridEdit} from "../../simplegrid/SimpleGrid";
import {AppStore} from "angular2-redux-util/dist/index";
import {BusinessAction} from "../../../business/BusinessAction";

@Component({
    selector: 'UsersDetails',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [SIMPLEGRID_DIRECTIVES],
    pipes: [OrderBy],
    styles: [`
            .simpleGridRecord:nth-child(odd) {
                 background-color: #eee;
            }
            .simpleGridRecord:nth-child(even) {
                background-color: #fff;
            }
    `],
    template: `
        <simpleGridTable>
            <thead>
            <tr>
              <th sortableHeader="name" [sort]="sort">name</th>
              <th>login</th>
              <th sortableHeader="businessId" [sort]="sort">business</th>
              <th sortableHeader="fromTemplateId" [sort]="sort">tmp</th>
            </tr>
          </thead>
          <tbody>                                                                          
          <tr class="simpleGridRecord" simpleGridRecord *ngFor="#item of _businesses | OrderBy:sort.field:sort.desc; #index=index" 
            [item]="item" [index]="index">
                <td simpleGridData (labelEdited)="onLabelEdited($event)" [editable]="true" [field]="'name'" [item]="item"></td>
                <td simpleGridData [field]="'lastLogin'" [item]="item"></td>
                <td simpleGridData [field]="'businessId'" [item]="item"></td>
                <td simpleGridDataImage [field]="'fa-plus'" [item]="item"></td>
          </tr>
          </tbody>                 
        </simpleGridTable>
    `
})

export class UsersDetails {
    public sort:{field: string, desc: boolean} = {field: null, desc: false};
    private _businesses:List<BusinessModel>;

    private onLabelEdited(event:ISimpleGridEdit){
        var value = event.value;
        var businessModel = event.item;
        var businessId = businessModel.getKey('businessId');
        this.appStore.dispatch(this.businessActions.setBusinessField(businessId, 'name', value));
    }

    @Input()
    set businesses(i_businesses) {
        this._businesses = i_businesses;
    }

    // @Output()
    // addToCart:EventEmitter<any> = new EventEmitter();

    constructor(private appStore:AppStore, private businessActions:BusinessAction) {
    }
}



