import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';

const routes: Routes = [
	{
		path: '',
		component: ListComponent,
	},
];

const config: ExtraOptions = {
	// enableTracing: true,
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
