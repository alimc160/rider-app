<template>
  <div class="container-fluid">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Vehicle types list</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <button
                class="btn btn-sm btn-primary float-right"
                @click="AddVehicleTypeModal"
            >Add vehicle type
            </button>
          </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">

        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"></h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search"
                           v-model="search_query" @keyup.enter="searchRecord()">
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0" style="mx-height: 500px;">
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="vehicle_type in items" :key="vehicle_type.id">
                    <td> {{ vehicle_type.title }}</td>
                    <td> {{ vehicle_type.description }}</td>
                    <td> {{ vehicle_type.category?.title }}</td>
                    <td> {{ vehicle_type.company?.title }}</td>
                    <td>
                      <a class="btn btn-sm btn-danger" @click.prevent="deleteVehicleType(vehicle_type.id)">
                        <i class="fas fa-trash"></i>
                        Delete
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-tools data-table-footer">
                <div class="ml-2 mt-2 float-left">
		                	<span>
		                		Showing from {{ from || 0 }} to {{ to || 0 }} of {{ total }} entries
		                	</span>
                </div>
                <pagination
                    :total-pages="totalPages"
                    class="float-right mr-2 mt-2"
                    :total="total"
                    :per-page="perPage"
                    :current-page="currentPage"
                    @pagechanged="onPageChange"
                />
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->
    <AddVehicleTypeModal></AddVehicleTypeModal>
  </div>
</template>

<script>
import pagination from '@/components/global/pagination.vue';
import AddVehicleTypeModal from "./modals/AddVehicleTypeModal";

export default {
  name: "AboutView",
  props: [],
  components: {
    pagination: pagination,
    AddVehicleTypeModal,
  },
  data() {
    return {
      items: [],
      totalPages: 1,
      perPage: 0,
      total: 0,
      from: 0,
      to: 0,
      currentPage: 1,
      search_query: "",
    };
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
      this.getdata();
    },

    getdata() {
      axios.get('/api/admin/vehicle-types', {
        params: {
          page: this.currentPage,
          search_query: this.search_query,
        }
      }).then(response => {
        this.items = response.data.data.items;
        this.totalPages = response.data.data.pagination.last_page;
        this.perPage = response.data.data.pagination.per_page;
        this.total = response.data.data.pagination.total;
        this.from = response.data.data.pagination.from;
        this.to = response.data.data.pagination.to;
      }).catch(error => {
        console.error("There was an error!", error);
      }).finally(() => {
      });
    },

    searchRecord() {
      this.currentPage = 1;
      this.getdata();
    },

    AddVehicleTypeModal() {
      Emitter.emit("ADD-VEHICLE-TYPE-MODAL");
    },

    deleteVehicleType(id) {
      this.$swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('/api/admin/vehicle-types/' + id).then(response => {
            this.$swal({
              icon: 'success',
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.getdata();
          }).catch(error => {
            this.$swal({
              icon: 'error',
              text: error.response.data.message,
            });
          });
        }
      });
    }


  },

  mounted() {
    this.getdata();
  },

  created() {
    Emitter.on("VEHICLE-TYPES-LIST", (data) => {
      this.getdata();
    });
  },

  destroyed() {
  },

};
</script>