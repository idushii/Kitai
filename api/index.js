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

router.get('/pages', Page.Pages)
router.get('/page/:Path', Page.PageByPath)
router.post('/save/page/:Path', Page.SavePageByPath)

router.get('/words', Word.List)
router.get('/WordsCategoris', Word.Categoris)
router.post('/Words/Upload/:Name', upload.Word)
router.post('/Words/:id', Word.Save)

router.get('/categoris', Category.List)

router.get('/TestList', Test.TestList)
router.get('/Test/:id', Test.TestById)
router.get('/Test/:id/Items', Test.TestByIdItems)

router.post('/Save/TestInfo/', Test.SaveTestInfo)
router.post('/Save/TestItem/', Test.SaveTestItem)
router.post('/Save/Test/', Test.SaveTest)
router.post('/New/Test/', Test.NewTest)

// Export the server middleware
export default {
  path: '/api',
  handler: router
}