<script lang="typescript">
	import 'dragula/dist/dragula.min.css'
	import FormBuilder from '@app/features/form/edit/FormBuilder.svelte'
	import FormSidebar from '@app/features/form/edit/FormSidebar.svelte'
	import FieldEditSidebar from '@app/features/form/edit/FieldEditSidebar.svelte'
	import { onMount } from 'svelte'
	import { subscribe, subscribeComponent } from '@app/event/EventBus'
	import Sidebar from '@app/components/Sidebar.svelte'
	import type { IForm } from '@app/models/IForm'
	import { getUrlParameter } from '@app/util/Http'
  
	let rightSidebar: any
	let rightSidebarProps: any = {}
  
	subscribeComponent('show_right_sidebar', ({ component, ...other }) => {
	  rightSidebar = component
	  rightSidebarProps = other ?? {}
	})
  
	onMount(() => {
	  rightSidebar = FieldEditSidebar
	})
  </script>
  
  <div class="App">
	<div class="container-fluid clearfix" id="main-container" style="margin-top: 3.9em;">
		<div class="left-sidebar">
		  <Sidebar>
			<FormSidebar />
		  </Sidebar>
		</div>
		<div class="main">
		  <FormBuilder />
		</div>
		<div class="right-sidebar">
		  <Sidebar>
			<svelte:component this={rightSidebar} {...rightSidebarProps} />
		  </Sidebar>
		</div>
	  </div>
  </div>

  
  <style>
	.main {
	  height: 100%;
	  width: 53%;
	  margin-top: 1em;
	}
  
	.left-sidebar {
	  width: 15%;
	  max-width: 400px;
	  height: 100vh;
	  overflow: auto;
	  margin-left: -13px;
	  position: -webkit-sticky;
	  position: sticky;
	  top: 0;
	}
	#main-container {
	  display: flex;
	  justify-content: space-between;
	}
  
	.right-sidebar {
	  width: 32%;
	  min-height: 25vh;
	  height: 100%;
	  margin-right: -30px;
	  position: -webkit-sticky;
	  position: sticky;
	  top: 0;
	}
  </style>
  