import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supervisorDelivery'
})
export class SupervisorDeliveryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
