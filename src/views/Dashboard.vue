<template>
	<button class=" ml-2 btn btn-primary" @click="check">
		Check api
	</button>
	<button class=" ml-2 btn btn-primary" @click="checkModal">
		Check modal
	</button>
	<button class=" ml-2 btn btn-primary" @click="checkModal2">
		Check modal 2
	</button>
	<TestModal></TestModal>
	<TestModal2></TestModal2>
</template>

<script>
import TestModal from "./modals/TestModal";
import TestModal2 from "./modals/TestModal2";

export default {
name: 'DashboardView',
components: {
	TestModal,
	TestModal2,
},
mounted() {
},
methods: {
	check() {
		axios.get('api/admin/vehicle-types').then(response => {

		}).catch(error => {

		}).finally(() => {

		});
	},
	checkModal() {
		Emitter.emit("TEST-MODAL");
	},
	
	checkModal2() {
		Emitter.emit("TEST-MODAL2");
	},
},
};
</script>