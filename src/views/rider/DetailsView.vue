<template>
  <div class="container-fluid">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Rider Detail</h1>
          </div>
          <div class="col-sm-6">
            <div class="row float-right">
              <div class="col-12">
                <button class="btn btn-primary" @click="updateStatus(rider.uuid,'in_progress')">In Progress</button>
                <button class="btn btn-success ml-1" @click="updateStatus(rider.uuid,'approved')">Approved</button>
                <button class="btn btn-danger ml-1" @click="updateStatus(rider.uuid,'cancelled')">Cancelled</button>
              </div>
            </div>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <div class="content">
      <div class="container-fluid">
        <section class="content">

          <!-- Default box -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">General Detail</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i class="fas fa-minus"></i>
                </button>
                <!--                    <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">-->
                <!--                      <i class="fas fa-times"></i>-->
                <!--                    </button>-->
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <p>Name : {{ rider.name }}</p>
                </div>
                <div class="col-6">
                  <p>Father name : {{ rider.father_name }}</p>
                </div>
                <div class="col-6">
                  <p>CNIC : {{ rider.cnic }}</p>
                </div>
                <div class="col-6">
                  <p>Phone number : {{ rider.phone_number }}</p>
                </div>
                <div class="col-6">
                  <p>Email : {{ rider.email }}</p>
                </div>
                <div class="col-6">
                  <p>Status :
                    <span :class="[
                          'badge',
                          (rider.status==='pending' ? 'badge-warning' : ''),
                          (rider.status==='approved' ? 'badge-success' : ''),
                          (rider.status==='cancelled' ? 'badge-danger' : ''),
                          (rider.status==='in_progress' ? 'badge-primary' : ''),
                          ]"
                          class="text-capitalize"
                    >
                        {{ rider.status }}
                      </span>
                  </p>
                </div>

                <div class="col-12" v-if="rider.notes">
                  <p>Notes : {{ rider.notes }}
                  </p>
                </div>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
          <!-- Documents box -->
          <div class="card"
               v-if="rider.rider_selfie_picture || rider.rider_cnic || rider.rider_contract || rider.rider_licence">
            <div class="card-header">
              <h3 class="card-title">Documents Detail</h3>
              <!---->
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6" v-if="rider.rider_selfie_picture">
                  <p class="font-weight-bold">
                    Selfie Picture
                    <span class="badge" :class="[
                      rider.rider_selfie_picture.status === 'pending' ? 'badge-warning' : '',
                      rider.rider_selfie_picture.status === 'in_progress' ? 'badge-primary' : '',
                      rider.rider_selfie_picture.status === 'cancelled' ? 'badge-danger' : '',
                      rider.rider_selfie_picture.status === 'approved' ? 'badge-success' : '',
                  ]"> {{ rider.rider_selfie_picture.status }}
                  </span>
                  </p>
                  <button class="btn btn-sm btn-primary"
                          @click="showUpdateFileModal('Selfie','selfie_picture',rider.rider_selfie_picture.id)">
                    <i class="fa fa-edit"></i>
                  </button>
                  <photo-provider>
                    <photo-consumer
                        :intro="rider.rider_selfie_picture.value"
                        :key="rider.rider_selfie_picture.value"
                        :src="rider.rider_selfie_picture.value"
                    >
                      <img class="h-auto w-50 mt-2 mb-2" :src="rider.rider_selfie_picture.value"
                           alt="selfie">
                    </photo-consumer>
                  </photo-provider>
                  <!---->
                </div>
                <div class="col-6" v-if="rider.rider_cnic">
                  <div class="row">
                    <div class="col-12">

                      <p class="font-weight-bold">CNIC
                        <span class="badge" :class="[
                      rider.rider_cnic.status === 'pending' ? 'badge-warning' : '',
                      rider.rider_cnic.status === 'in_progress' ? 'badge-primary' : '',
                      rider.rider_cnic.status === 'cancelled' ? 'badge-danger' : '',
                      rider.rider_cnic.status === 'approved' ? 'badge-success' : '',
                  ]"> {{ rider.rider_cnic.status }}
                  </span>
                      </p>
                      <button class="btn btn-sm btn-primary"
                              @click="showUpdateFileModal('CNIC','cnic',rider.rider_cnic.id)">
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                    <div class="col-6 mt-2 mb-2">
                      <!--                      <p class="font-weight-bold">CNIC Front Picture</p>-->
                      <photo-provider>
                        <photo-consumer
                            :intro="rider.rider_cnic.front_pic"
                            :key="rider.rider_cnic.front_pic"
                            :src="rider.rider_cnic.front_pic"
                        >
                          <img class="h-auto w-50" :src="rider.rider_cnic.front_pic" alt="selfie">
                        </photo-consumer>
                      </photo-provider>
                    </div>
                    <div class="col-6">
                      <photo-provider>
                        <photo-consumer
                            :intro="rider.rider_cnic.back_pic"
                            :key="rider.rider_cnic.back_pic"
                            :src="rider.rider_cnic.back_pic"
                        >
                          <img class="h-auto w-50" :src="rider.rider_cnic.back_pic" alt="selfie">
                        </photo-consumer>
                      </photo-provider>
                    </div>
                  </div>
                </div>
                <div class="col-6 mt-2 mb-2" v-if="rider.rider_licence">
                  <p class="font-weight-bold">Licence
                    <span class="badge" :class="[
                      rider.rider_licence.status === 'pending' ? 'badge-warning' : '',
                      rider.rider_licence.status === 'in_progress' ? 'badge-primary' : '',
                      rider.rider_licence.status === 'cancelled' ? 'badge-danger' : '',
                      rider.rider_licence.status === 'approved' ? 'badge-success' : '',
                  ]"> {{ rider.rider_licence.status }}
                  </span>
                  </p>
                  <button class="btn btn-sm btn-primary"
                          @click="showUpdateFileModal('Licence','licence',rider.rider_licence.id)">
                    <i class="fa fa-edit"></i>
                  </button>
                  <photo-provider>
                    <photo-consumer
                        :intro="rider.rider_licence.value"
                        :key="rider.rider_licence.value"
                        :src="rider.rider_licence.value"
                    >
                      <img class="h-auto w-50" :src="rider.rider_licence.value" alt="selfie">
                    </photo-consumer>
                  </photo-provider>
                  <!---->
                </div>
                <div class="col-6 mt-2 mb-2" v-if="rider.rider_contract">
                  <p class="font-weight-bold">Contract
                    <span class="badge" :class="[
                      rider.rider_contract.status === 'pending' ? 'badge-warning' : '',
                      rider.rider_contract.status === 'in_progress' ? 'badge-primary' : '',
                      rider.rider_contract.status === 'cancelled' ? 'badge-danger' : '',
                      rider.rider_contract.status === 'approved' ? 'badge-success' : '',
                  ]"> {{ rider.rider_contract.status }}
                  </span>
                  </p>
                  <button class="btn btn-sm btn-primary"
                          @click="showUpdateFileModal('Contract','contract',rider.rider_contract.id)">
                    <i class="fa fa-edit"></i>
                  </button>
                  <photo-provider>
                    <photo-consumer
                        :intro="rider.rider_contract.value"
                        :key="rider.rider_contract.value"
                        :src="rider.rider_contract.value"
                    >
                      <img class="h-auto w-50" :src="rider.rider_contract.value" alt="selfie">
                    </photo-consumer>
                  </photo-provider>
                  <!---->
                </div>
              </div>
            </div>
          </div>

          <div class="card" v-if="rider.rider_vehicle">
            <div class="card-header">
              <h3 class="card-title">Vehicle Detail</h3>

              <div class="card-tools">
                <button class="btn btn-primary" @click="openUpdateRiderVehicleModal(rider.rider_vehicle.id)"
                        title="Click to Update Status">
                  <i class="fa fa-edit"></i>
                </button>
                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="row">
                    <div class="col-6">
                      <p>Registration Number : {{ rider.rider_vehicle.registration_number }}</p>
                    </div>
                    <div class="col-6">
                      <p>Vehicle Type : {{ rider.rider_vehicle.vehicle_type.title ?? '' }}</p>
                    </div>
                    <div class="col-6">
                      <p>Color : {{ rider.rider_vehicle.color ?? "" }}</p>
                    </div>
                    <div class="col-6">
                      <p>Status : <span
                          class="badge"
                          :class="[
                            rider.rider_vehicle.status === 'pending' ? 'badge-warning' : '',
                            rider.rider_vehicle.status === 'in_progress' ? 'badge-primary' : '',
                            rider.rider_vehicle.status === 'approved' ? 'badge-success' : '',
                            rider.rider_vehicle.status === 'cancelled' ? 'badge-danger' : ''
                          ]"
                      >{{ rider.rider_vehicle.status }}</span></p>
                    </div>
                  </div>
                </div>
                <div class="col-6" v-if="rider.rider_vehicle.image">
                  <p>Image</p>
                  <photo-provider>
                    <photo-consumer
                        :intro="rider.rider_vehicle.image"
                        :key="rider.rider_vehicle.image"
                        :src="rider.rider_vehicle.image"
                    >
                      <img class="h-auto w-50" :src="rider.rider_vehicle.image"
                           alt="selfie">
                    </photo-consumer>
                  </photo-provider>
                </div>
                <div class="col-6" v-if="rider.rider_vehicle.description">
                  <p>Description : {{ rider.rider_vehicle.description }} </p>
                </div>
              </div>
            </div>
            <!-- /.card-body -->
          </div>


        </section>
      </div>
    </div>
    <!-- /.content-header -->
    <UpdateRiderFileStatusModal></UpdateRiderFileStatusModal>
    <UpdateRiderVehicleStatusModal/>
  </div>
</template>

<script>

import {PhotoProvider} from "vue3-photo-preview";
import UpdateRiderFileStatusModal from "@/views/modals/UpdateRiderFileStatusModal.vue";
import UpdateRiderVehicleStatusModal from "@/views/modals/UpdateRiderVehicleStatusModal.vue";

export default {
  name: "DetailsView",
  components: {
    PhotoProvider,
    UpdateRiderFileStatusModal,
    UpdateRiderVehicleStatusModal
  },
  data() {
    return {
      rider: "",
    }
  },
  methods: {
    async getRider() {
      const id = this.$route.params.id;
      let request = {
        uuid: id
      };
      await axios.get('api/admin/rider/rider-details', {
        params: request
      }).then(res => {
        this.rider = res.data.data
      }).catch(error => {
        console.log(error);
      })
    },
    async updateFileStatusApiRequest(data) {
      return await axios.post('/api/admin/rider/update-status', data).then((res) => {
        this.$swal({
          icon: 'success',
          title: res.data?.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.rider['status'] = data.status
      }).catch(error => {
        this.$swal({
          icon: 'error',
          text: error.response.data.message,
        });
      });
    },
    async updateStatus(uuid, status) {
      let data = {
        uuid: uuid,
        status: status
      };
      if (status === 'cancelled') {
        await this.$swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, cancelled it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateFileStatusApiRequest(data);
          }
        });
      }else {
        await this.updateFileStatusApiRequest(data);
      }
    },
    openUpdateRiderVehicleModal(rider_vehicle_id) {
      Emitter.emit('OPEN-RIDER-VEHICLE-UPDATE-STATUS-MODAL', rider_vehicle_id);
    },
    showUpdateFileModal(title, attribute, attribute_id) {
      let data = {
        file_name: title,
        attribute_title: attribute,
        attribute_id: attribute_id
      }
      Emitter.emit('OPEN-UPDATE-FILE-MODAL', data);
    }
  },

  mounted() {
    this.getRider();
    Emitter.on('UPDATE_STATUS_EVENT', (res) => {
      if (res.field === "selfie_picture") {
        this.rider.rider_selfie_picture.status = res.status;
      } else if (res.field === "cnic") {
        this.rider.rider_cnic.status = res.status;
      } else if (res.field === 'licence') {
        this.rider.rider_licence.status = res.status;
      } else if (res.field === 'contract') {
        this.rider.rider_contract.status = res.status;
      } else {
        this.rider.rider_vehicle['status'] = res.status;
      }
    });
  },
  created() {
  }
}
</script>

<style scoped>

</style>