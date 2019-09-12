import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the ContatoFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'contato-form',
  templateUrl: 'contato-form.html',

})
export class ContatoFormComponent {

  uid: string;
  contatoForm: FormGroup;
  today = new Date().toISOString();

  nome: AbstractControl;
  idade: AbstractControl;
  sexo: AbstractControl;
  posto: AbstractControl;
  diagnostico: AbstractControl;

  constructor(
    public formbuilder: FormBuilder,
    public http: Http,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public afAuth: AngularFireAuth
  ) {
    this.uid = this.afAuth.auth.currentUser.uid;
    console.log(this.uid);

    this.contatoForm = this.formbuilder.group({
      exercicio: [null, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      idade: [null, [Validators.required]],
      sexo: [null, [Validators.required, Validators.minLength(5)]],
      posto: [null, [Validators.required, Validators.minLength(5)]],
      diagnostico: [null, [Validators.required, Validators.minLength(5)]],
      area: [null, [Validators.required]],
      estadocivil: [null, [Validators.required]],
      quemmora: [null, [Validators.required]],
      qtdpessoas: [null, [Validators.required]],
      moradia: [null, [Validators.required]],
      agua: [null, [Validators.required]],
      luz: [null, [Validators.required]],
      esgoto: [null, [Validators.required]],
      pavimento: [null, [Validators.required]],
      lixo: [null, [Validators.required]],
      escolaridade: [null, [Validators.required, Validators.minLength(5)]],
      situacaoprofissional: [null, [Validators.required, Validators.minLength(5)]],
      profissao: [null, [Validators.required, Validators.minLength(5)]],
      salario: [null, [Validators.required]],
      beneficio: [null, [Validators.required]],
      historiapatologica: [null, [Validators.required]],
      alcool: [null, [Validators.required]],
      cigarro: [null, [Validators.required]],
      medicamentos: [null, [Validators.required, Validators.minLength(5)]],
      sugestaoencaminhamento: [null, [Validators.required]],
      motivoencaminhamento: [null, [Validators.required, Validators.minLength(5)]],
      data: [null, [Validators.required]],
      uid: [this.uid]
    })
    this.nome = this.contatoForm.controls["nome"];
    this.idade = this.contatoForm.controls["idade"];
    this.sexo = this.contatoForm.controls["sexo"];
    this.posto = this.contatoForm.controls["posto"];
    this.diagnostico = this.contatoForm.controls["diagnostico"];
  }


  cadastraContato() {
    this.db.database.ref('/paciente').push(this.contatoForm.value)
      .then(() => {

        this.navCtrl.setRoot('start-page');
        this.presentAlert('', 'Dados inseridos com sucesso!');
        console.log(this.contatoForm);
        this.contatoForm.reset();
      })
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }


}
