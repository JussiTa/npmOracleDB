import {juu} from './hello';


export default function save(req, res) {
    
    
    res.status(200).json({ text: juu.text});
  }
