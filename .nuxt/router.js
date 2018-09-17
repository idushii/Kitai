import Vue from 'vue'
import Router from 'vue-router'

const _0fec96b6 = () => import('..\\pages\\auth.vue' /* webpackChunkName: "pages_auth" */).then(m => m.default || m)
const _6aa4d1a5 = () => import('..\\pages\\Page\\index.vue' /* webpackChunkName: "pages_Page_index" */).then(m => m.default || m)
const _30e7ef48 = () => import('..\\pages\\auth-vk.vue' /* webpackChunkName: "pages_auth-vk" */).then(m => m.default || m)
const _71774818 = () => import('..\\pages\\logout.vue' /* webpackChunkName: "pages_logout" */).then(m => m.default || m)
const _f781496c = () => import('..\\pages\\Edit\\index.vue' /* webpackChunkName: "pages_Edit_index" */).then(m => m.default || m)
const _dba16768 = () => import('..\\pages\\Reg2.vue' /* webpackChunkName: "pages_Reg2" */).then(m => m.default || m)
const _785357d6 = () => import('..\\pages\\Reg.vue' /* webpackChunkName: "pages_Reg" */).then(m => m.default || m)
const _3df193a0 = () => import('..\\pages\\propertis.vue' /* webpackChunkName: "pages_propertis" */).then(m => m.default || m)
const _638e898b = () => import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */).then(m => m.default || m)
const _09d2c07c = () => import('..\\pages\\Test\\index.vue' /* webpackChunkName: "pages_Test_index" */).then(m => m.default || m)
const _f247d120 = () => import('..\\pages\\Test\\New.vue' /* webpackChunkName: "pages_Test_New" */).then(m => m.default || m)
const _4b7593f6 = () => import('..\\pages\\Add\\Words.vue' /* webpackChunkName: "pages_Add_Words" */).then(m => m.default || m)
const _b89c35b4 = () => import('..\\pages\\Page\\Words\\index.vue' /* webpackChunkName: "pages_Page_Words_index" */).then(m => m.default || m)
const _bf4e5dfa = () => import('..\\pages\\Page\\Testing.vue' /* webpackChunkName: "pages_Page_Testing" */).then(m => m.default || m)
const _d479fd1c = () => import('..\\pages\\Page\\Words-Private.vue' /* webpackChunkName: "pages_Page_Words-Private" */).then(m => m.default || m)
const _7b925c91 = () => import('..\\pages\\Edit\\Word\\_Translate.vue' /* webpackChunkName: "pages_Edit_Word__Translate" */).then(m => m.default || m)
const _26a6d478 = () => import('..\\pages\\Page\\Words\\_Path.vue' /* webpackChunkName: "pages_Page_Words__Path" */).then(m => m.default || m)
const _48475554 = () => import('..\\pages\\Edit\\Category\\_id.vue' /* webpackChunkName: "pages_Edit_Category__id" */).then(m => m.default || m)
const _354a1a52 = () => import('..\\pages\\Record\\_id\\index.vue' /* webpackChunkName: "pages_Record__id_index" */).then(m => m.default || m)
const _21193698 = () => import('..\\pages\\Test\\_id\\index.vue' /* webpackChunkName: "pages_Test__id_index" */).then(m => m.default || m)
const _07344a9c = () => import('..\\pages\\Edit\\_Path.vue' /* webpackChunkName: "pages_Edit__Path" */).then(m => m.default || m)
const _24cc7e12 = () => import('..\\pages\\Page\\_Path.vue' /* webpackChunkName: "pages_Page__Path" */).then(m => m.default || m)
const _d8cbe946 = () => import('..\\pages\\Test\\_id\\Finish.vue' /* webpackChunkName: "pages_Test__id_Finish" */).then(m => m.default || m)
const _5bb65db5 = () => import('..\\pages\\Record\\_id\\Edit.vue' /* webpackChunkName: "pages_Record__id_Edit" */).then(m => m.default || m)
const _e19fc458 = () => import('..\\pages\\Test\\_id\\Edit.vue' /* webpackChunkName: "pages_Test__id_Edit" */).then(m => m.default || m)
const _49c2aa08 = () => import('..\\pages\\Test\\_id\\Start.vue' /* webpackChunkName: "pages_Test__id_Start" */).then(m => m.default || m)
const _501de1a2 = () => import('..\\pages\\Test\\_id\\EditInfo.vue' /* webpackChunkName: "pages_Test__id_EditInfo" */).then(m => m.default || m)
const _a7412354 = () => import('..\\pages\\Test\\_id\\Page\\_index\\index.vue' /* webpackChunkName: "pages_Test__id_Page__index_index" */).then(m => m.default || m)
const _22f61354 = () => import('..\\pages\\Test\\_id\\Page\\_index\\Edit.vue' /* webpackChunkName: "pages_Test__id_Page__index_Edit" */).then(m => m.default || m)
const _40429314 = () => import('..\\pages\\Page\\_PathPage\\_PathCategory\\index.vue' /* webpackChunkName: "pages_Page__PathPage__PathCategory_index" */).then(m => m.default || m)
const _684fe229 = () => import('..\\pages\\Record\\_id\\_Path.vue' /* webpackChunkName: "pages_Record__id__Path" */).then(m => m.default || m)
const _01f0b1a5 = () => import('..\\pages\\Page\\_PathPage\\_PathCategory\\Add.vue' /* webpackChunkName: "pages_Page__PathPage__PathCategory_Add" */).then(m => m.default || m)
const _691156b4 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)

Vue.use(Router)


const scrollBehavior = function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/auth",
			component: _0fec96b6,
			name: "auth"
		},
		{
			path: "/Page",
			component: _6aa4d1a5,
			name: "Page"
		},
		{
			path: "/auth-vk",
			component: _30e7ef48,
			name: "auth-vk"
		},
		{
			path: "/logout",
			component: _71774818,
			name: "logout"
		},
		{
			path: "/Edit",
			component: _f781496c,
			name: "Edit"
		},
		{
			path: "/Reg2",
			component: _dba16768,
			name: "Reg2"
		},
		{
			path: "/Reg",
			component: _785357d6,
			name: "Reg"
		},
		{
			path: "/propertis",
			component: _3df193a0,
			name: "propertis"
		},
		{
			path: "/profile",
			component: _638e898b,
			name: "profile"
		},
		{
			path: "/Test",
			component: _09d2c07c,
			name: "Test"
		},
		{
			path: "/Test/New",
			component: _f247d120,
			name: "Test-New"
		},
		{
			path: "/Add/Words",
			component: _4b7593f6,
			name: "Add-Words"
		},
		{
			path: "/Page/Words",
			component: _b89c35b4,
			name: "Page-Words"
		},
		{
			path: "/Page/Testing",
			component: _bf4e5dfa,
			redirect: "/Test",
			name: "Page-Testing"
		},
		{
			path: "/Page/Words-Private",
			component: _d479fd1c,
			name: "Page-Words-Private"
		},
		{
			path: "/Edit/Word/:Translate?",
			component: _7b925c91,
			name: "Edit-Word-Translate"
		},
		{
			path: "/Page/Words/:Path",
			component: _26a6d478,
			name: "Page-Words-Path"
		},
		{
			path: "/Edit/Category/:id?",
			component: _48475554,
			name: "Edit-Category-id"
		},
		{
			path: "/Record/:id?",
			component: _354a1a52,
			name: "Record-id"
		},
		{
			path: "/Test/:id",
			component: _21193698,
			name: "Test-id"
		},
		{
			path: "/Edit/:Path",
			component: _07344a9c,
			name: "Edit-Path"
		},
		{
			path: "/Page/:Path",
			component: _24cc7e12,
			name: "Page-Path"
		},
		{
			path: "/Test/:id/Finish",
			component: _d8cbe946,
			name: "Test-id-Finish"
		},
		{
			path: "/Record/:id?/Edit",
			component: _5bb65db5,
			name: "Record-id-Edit"
		},
		{
			path: "/Test/:id/Edit",
			component: _e19fc458,
			name: "Test-id-Edit"
		},
		{
			path: "/Test/:id/Start",
			component: _49c2aa08,
			name: "Test-id-Start"
		},
		{
			path: "/Test/:id/EditInfo",
			component: _501de1a2,
			name: "Test-id-EditInfo"
		},
		{
			path: "/Test/:id/Page/:index",
			component: _a7412354,
			name: "Test-id-Page-index"
		},
		{
			path: "/Test/:id/Page/:index/Edit",
			component: _22f61354,
			name: "Test-id-Page-index-Edit"
		},
		{
			path: "/Page/:PathPage/:PathCategory?",
			component: _40429314,
			name: "Page-PathPage-PathCategory"
		},
		{
			path: "/Record/:id?/:Path",
			component: _684fe229,
			name: "Record-id-Path"
		},
		{
			path: "/Page/:PathPage/:PathCategory?/Add",
			component: _01f0b1a5,
			name: "Page-PathPage-PathCategory-Add"
		},
		{
			path: "/",
			component: _691156b4,
			redirect: "/Page/Main",
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
