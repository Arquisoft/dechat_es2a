import {file} from '@babel/types';

const assert = import('assert');
const fileClient = import('solid-file-client');
// @ts-ignore
import { EnvioChatComponent } from '../../components/envio-chat';



const name = this.getUserByUrl(this.ruta_seleccionada);


//crear una carpeta
this.createNewFolder('dechat2a', '/public/');

//name -> nombre del usuario
this.createNewFolder(name, '/public/');







