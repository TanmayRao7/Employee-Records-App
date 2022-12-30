import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { RestaurantData } from 'restaurent.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent {

  formValue!: FormGroup
  showAdd!: boolean
  showbtn!: boolean

  restaurentModelObj: RestaurantData = new RestaurantData;
  allRestarantData: any;

  constructor(private formBuilder: FormBuilder, private api:ApiService) {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
      
    })
    this.getAllData()

  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true
    this.showbtn = false
  }

  addResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postResturant(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Records added successfully!!")
      this.formValue.reset()
      this.getAllData()
    })
  }
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestarantData = res;
    })
  }

  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Record Deleted")
      this.getAllData()
    })
  }

  onEditResto(data:any){
    this.showAdd = false
    this.showbtn = true
    this.restaurentModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto(){

    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Records Updated")
      this.formValue.reset()
      this.getAllData();
    })

  }

}
