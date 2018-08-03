import router from './router'

import Auth from './Auth'
import Page from './Page'
import Word from './Word'
import Test from './Test'
import Category from './Category'
import upload from './upload'

router.post('/login', Auth.Login)
router.post('/logout', Auth.LogOut)
router.post('/mysql', Auth.TestMySQL)

router.post('/Img/Upload', upload.Img)

router.get('/pages', Page.List)
router.get('/page/:Path', Page.ByPath)
router.post('/save/page/:Path', Page.SaveByPath)

router.get('/words', Word.List)
router.get('/WordsCategoris', Word.Categoris)
router.post('/Words/Upload/:Name', upload.Word)
router.post('/Words/:id', Word.Save)

router.get('/categoris', Category.List)

router.get('/TestList', Test.List)
router.get('/Test/:id', Test.ById)
router.get('/Test/:id/Items', Test.ByIdItems)

router.post('/Save/TestInfo/', Test.SaveInfo)
router.post('/Save/TestItem/', Test.SaveItem)
router.post('/Save/Test/', Test.Save)
router.post('/New/Test/', Test.New)

// Export the server middleware
export default {
  path: '/api',
  handler: router
}