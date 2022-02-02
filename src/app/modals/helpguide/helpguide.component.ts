import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ApisProvider } from 'src/app/utility/api';

@Component({
  selector: 'app-helpguide',
  templateUrl: './helpguide.component.html',
  styleUrls: ['./helpguide.component.scss']
})
export class HelpguideComponent implements OnInit {
  @ViewChild('nav',null) slider: NgImageSliderComponent;
  name = 'Angular';
  imageObject = [{
      image: 'assets/helper/Request1.png',
      thumbImage: 'assets/helper/Request1.png',
      //title: 'Step 1'
  },
  {
    image: 'assets/helper/Tab1.png',
    thumbImage: 'assets/helper/Tab1.png',
   // title: 'Hummingbirds are amazing creatures'
},
{
  image: 'assets/helper/Tab2.png',
  thumbImage: 'assets/helper/Tab2.png',
 // title: 'Hummingbirds are amazing creatures'
},
{
  image: 'assets/helper/Tab3.png',
  thumbImage: 'assets/helper/Tab3.png',
 // title: 'Hummingbirds are amazing creatures'
},{
  image: 'assets/helper/PeerReview.png',
  thumbImage: 'assets/helper/PeerReview.png',
  //title: 'Hummingbirds are amazing creatures'
},{
  image: 'assets/helper/Request2.png',
  thumbImage: 'assets/helper/Request2.png',
 // title: 'Hummingbirds are amazing creatures'
},{
  image: 'assets/helper/Status.png',
  thumbImage: 'assets/helper/Status.png',
  //title: 'Hummingbirds are amazing creatures'
}];


imageObject1 = [{
  image: 'assets/helper/m.png',
  thumbImage: 'assets/helper/m.png',
  //title: 'Step 1'
},{
image: 'assets/helper/m1.png',
thumbImage: 'assets/helper/m1.png',
// title: 'Hummingbirds are amazing creatures'
},{
  image: 'assets/helper/m2.png',
  thumbImage: 'assets/helper/m2.png',
  // title: 'Hummingbirds are amazing creatures'
  }];



imageObject2 = [{
  image: 'assets/helper/n.png',
  thumbImage: 'assets/helper/n.png',
  //title: 'Step 1'
},{
image: 'assets/helper/n1.png',
thumbImage: 'assets/helper/n1.png',
// title: 'Hummingbirds are amazing creatures'
},{
  image: 'assets/helper/n2.png',
  thumbImage: 'assets/helper/n2.png',
  // title: 'Hummingbirds are amazing creatures'
  }];


imageObject3 = [{
  image: 'assets/helper/s.png',
  thumbImage: 'assets/helper/s.png',
  //title: 'Step 1'
},
{
  image: 'assets/helper/stab.png',
  thumbImage: 'assets/helper/stab.png',
  // title: 'Hummingbirds are amazing creatures'
  },{
image: 'assets/helper/stab1.png',
thumbImage: 'assets/helper/stab1.png',
// title: 'Hummingbirds are amazing creatures'
},{
  image: 'assets/helper/stab2.png',
  thumbImage: 'assets/helper/stab2.png',
  // title: 'Hummingbirds are amazing creatures'
  },{
    image: 'assets/helper/stab3.png',
    thumbImage: 'assets/helper/stab3.png',
    // title: 'Hummingbirds are amazing creatures'
    },{
      image: 'assets/helper/stab4.png',
      thumbImage: 'assets/helper/stab4.png',
      // title: 'Hummingbirds are amazing creatures'
      },{
        image: 'assets/helper/stab5.png',
        thumbImage: 'assets/helper/stab5.png',
        // title: 'Hummingbirds are amazing creatures'
        }];





imageBaseObject=[];
  constructor(public router:Router,@Inject(MAT_DIALOG_DATA) public data: any,private spinnerService: Ng4LoadingSpinnerService,private api: ApisProvider,public dialogRef: MatDialogRef<HelpguideComponent>) { }

  ngOnInit() {
    this.spinnerService.hide()
    if(this.router.url=="/urs/userview"){
      this.imageBaseObject=this.imageObject;
    }else if(this.router.url=="/urs/managerapproval"){
      this.imageBaseObject=this.imageObject1
    }else if(this.router.url=="/urs/networkview"){
      this.imageBaseObject=this.imageObject2;
    }else if(this.router.url=="/urs/itreview"){
      this.imageBaseObject=this.imageObject3
    }else{
      this.imageBaseObject=this.imageObject;
    }
  


  }

  
prevImageClick() {
    this.slider.prev();
}

nextImageClick() {
    this.slider.next();
}

  actionFunction() {
    this.closeModal();
  }


  closeModal() {
    this.dialogRef.close();
  }


  

}


