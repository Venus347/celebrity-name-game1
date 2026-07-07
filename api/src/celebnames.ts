import fs from 'fs';

//Imports celebrity names from a json file and maps them onto an array
const filePath: string = 'celeb_names.json';
const a = fs.readFileSync(filePath, 'utf8');
interface celeb{
  name: string;
}
const data: celeb = JSON.parse(a);
const output = Object.values(data).map(x => x);
const names: string[] = output.map(x => x.name);

export default names;