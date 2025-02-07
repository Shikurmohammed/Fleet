import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
private isDarkMode = false;
constructor() {
  //this.isDarkMode= localStorage.getItem('dark-mode')==='true';
  //this.updateTheme();
}
toggleDarkMode(){
  this.isDarkMode= !this.isDarkMode;
  localStorage.setItem('dark-mode', JSON.stringify(this.isDarkMode));
  this.updateTheme();
}
updateTheme(){
  if(this.isDarkMode){
    console.log('addd dark mode');
    document.body.classList.add('dark-mode');
  }else{
    console.log('remove dark mode');
    document.body.classList.remove('dark-mode');
  }
}
isDarkModeEnabled(){
  return this.isDarkMode;
}

}
