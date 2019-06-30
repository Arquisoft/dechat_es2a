import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappMessageComponent } from './whatsapp-message.component';

describe('WhatsappMessageComponent', () => {
  let component: WhatsappMessageComponent;
  let fixture: ComponentFixture<WhatsappMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
