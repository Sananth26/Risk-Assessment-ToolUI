import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from './toastr.service'


@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
  styleUrls: ['./color-switcher.component.scss'],
  providers: [NGXToastrService]

})
export class ColorSwitcherComponent implements OnInit {



  constructor(private service: NGXToastrService) { }

  
  typeWarning() {
    this.service.typeWarning();
  }


  info() {
    this.service.typeinfo();
  }


  ngOnInit() {   
     // theme setting
	 $(".switcher-icon").on("click", function(e) {
    e.preventDefault();
    $(".right-sidebar").toggleClass("right-toggled");
});


$('#theme1').click(theme1);
$('#theme2').click(theme2);
$('#theme3').click(theme3);
$('#theme4').click(theme4);
$('#theme5').click(theme5);
$('#theme6').click(theme6);
$('#theme7').click(theme7);
$('#theme8').click(theme8);
$('#theme9').click(theme9);
$('#theme10').click(theme10);
$('#theme11').click(theme11);

function theme1() {
  console.log("theme1")
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme1');
}

function theme2() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme2');
}

function theme3() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme3');
}

function theme4() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme4');
}

function theme5() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme5');
}

function theme6() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme6');
}

function theme7() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme7');
}

function theme8() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme8');
}

function theme9() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme9');
}

function theme10() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme10');
}

function theme11() {
  $('#sidebar-wrapper').attr('class', 'sidebar bg-theme bg-theme11');
}


// header setting 

$('#header1').click(header1);
$('#header2').click(header2);
$('#header3').click(header3);
$('#header4').click(header4);
$('#header5').click(header5);
$('#header6').click(header6);
$('#header7').click(header7);
$('#header8').click(header8);
$('#header9').click(header9);
$('#header10').click(header10);
$('#header11').click(header11);

function header1() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme1');
}

function header2() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme2');
}

function header3() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme3');
}

function header4() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme4');
}

function header5() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme5');
}

function header6() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme6');
}

function header7() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme7');
}

function header8() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme8');
}

function header9() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme9');
}

function header10() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme10');
}

function header11() {
  $('#header-setting').attr('class', 'navbar navbar-expand fixed-top color-header bg-theme11');
}

}

}
