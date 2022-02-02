import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let multi:any[][] = [[1,4,6,8],[2,5,8,11],[3,7,9,12]]  
console.log(multi[0][0]) 
console.log(multi[0][1]) 
console.log(multi[0][2]) 
console.log(multi[0][3]) 
console.log(multi[1][0]) 
console.log(multi[1][1]) 
console.log(multi[1][2])
console.log(multi[1][3])
console.log(multi[2][0]) 
console.log(multi[2][1]) 
console.log(multi[2][2])
console.log(multi[2][3])  
  }

}
