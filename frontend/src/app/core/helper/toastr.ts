import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable()
export class Toast {
  constructor(private toast: HotToastService) {

  }

  customToastr(mode: string, message: string): void {
    switch(mode) {
      case 'success':
        this.toast.success(message, {
          duration: 1000,
          style: {
            color: '#fff',
            background: '#09BC8A',
            padding: '15px'
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#09BC8A'
          }
        });
        break;
        case 'info':
          this.toast.info(message, {
            duration: 1000,
            style: {
              color: '#fff',
              background: '#4361EE',
              padding: '15px'
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4361EE'
            }
          });
          break;
        case 'warning':
          this.toast.warning(message, {
            duration: 1000,
            style: {
              color: '#fff',
              background: '#F7B801',
              padding: '15px'
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#F7B801'
            }
          });
          break;
        case 'error':
          this.toast.error(message, {
            duration: 1000,
            style: {
              color: '#fff',
              background: '#FF686B',
              padding: '15px'
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#FF686B'
            }
          });
          break;


    }
  }

}
