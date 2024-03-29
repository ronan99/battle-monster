import { Router } from 'express';
import multer from 'multer';
import { MonsterController } from '../controllers/monster.controller';

const router = Router();
const upload = multer({ dest: 'upload' });

router.post('/', MonsterController.create);
router.post('/import', upload.single('monsters'), MonsterController.importCsv);
router.get('/:id', MonsterController.get);
router.get('/', MonsterController.getAll);
router.put('/:id', MonsterController.update);
router.delete('/:id', MonsterController.remove);

export default router;
