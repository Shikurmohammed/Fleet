// material.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importing Angular Material components
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { MatSidenavModule } from '@angular/material/sidenav';
import { BidiModule } from '@angular/cdk/bidi';  // Importing BidiModule
import { MatMenuModule } from '@angular/material/menu';  // Importing MatMenuModule
import { MatListModule } from '@angular/material/list';  // Importing MatListModule
import { MatDividerModule } from '@angular/material/divider';  // Importing MatDividerModule
import {MatBadgeModule} from '@angular/material/badge'; // Importing MatBadgeModule
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDialogModule,
    BidiModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDialogModule,
    BidiModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatBadgeModule,
   

  ]
})
export class MaterialModule { }
