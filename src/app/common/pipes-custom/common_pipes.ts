import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name:'upper'
})
export class CustomPipe implements PipeTransform{

	transform(value:string):string{
		let count=0;
		let newword='';
		let transformString='';
		const transformArray=value.split(' ').map((word)=>{
			let firstchar=word.charAt(0).toUpperCase();
			newword=firstchar+word.substr(1,word.length);
			return newword;
		})


		transformArray.forEach((word)=>{
			 transformString= transformString+word+' ';
		})
		return transformString; 
	}
}
