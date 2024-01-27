import './style.css'
import { Field } from './views/Field/Field';

const field = new Field('#field', (x, y) => {
  console.log(`clicked ${x}/${y}`);
});

field.render();
