<template>
  <div>
    <b-row class="card-dest">
      <b-col>
        <b-card header="Registrasi Siswa">
          <b-card-text>
            <b-form>
              <b-col md="6" sm="12">
                <b-form-group label="Nama">
                  <b-form-input type="text" placeholder="Nama" required v-model="form.nama"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                <b-form-group label="Username">
                  <b-form-input type="text" placeholder="Username" requierd v-model="form.username"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                <b-form-group label="Kelas">
                  <b-form-select v-model="form.uuid_kelas" :options="kelas">
                    <template v-slot:first>
                      <b-form-select-option value disabled>--Kelas--</b-form-select-option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Jenis kelamin">
                  <b-form-radio value="L" v-model="form.jk">Laki-laki</b-form-radio>
                  <b-form-radio value="P" v-model="form.jk">Perempuan</b-form-radio>
                </b-form-group>
              </b-col>
              <b-col md="10" sm="12">
                <b-form-group label="Alamat">
                  <b-form-input type="text" placeholder="Alamat" required v-model="form.alamat"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="10" sm="12">
                <b-form-group label="Tempat lahir">
                  <b-form-input
                    type="text"
                    placeholder="Tempat lahir"
                    required
                    v-model="form.tempat_lahir"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                <b-form-group label="Tanggal lahir">
                  <b-form-input type="date" required v-model="form.tanggal_lahir"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                <b-form-group label="Nomor Hp">
                  <b-form-input type="number" placeholder="Nomor Hp" required v-model="form.hp"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="10" sm="12">
                <b-form-group label="Email">
                  <b-form-input type="email" placeholder="Email" required v-model="form.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                <b-form-group label="Password">
                  <b-form-input
                    type="password"
                    placeholder="Password"
                    required
                    v-model="form.password"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                <b-form-group label="Confirm password">
                  <b-form-input
                    type="password"
                    placeholder="Confirm password"
                    required
                    v-model="confirm_password"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-btn size="sm" class="btn-info" @click="registration">Registrasi</b-btn>
              </b-col>
            </b-form>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import logout from "../../logout";
import { user } from "../../../api";
export default {
  name: "RegistrasiSiswa",
  data() {
    return {
      form: {
        nama: "",
        username: "",
        uuid_kelas: "",
        jk: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        hp: "",
        email: "",
        password: "",
      },
      confirm_password: "",
      kelas: [],
    };
  },
  methods: {
    async loadKelas() {
      try {
        let data = await user.getKelas();
        this.kelas = data.data;
      } catch (err) {
        logout.clear();
      }
    },
    isConfirmed() {
      if (this.form.password == this.confirm_password) {
        return true;
      }
      return false;
    },
    showMessageSukses() {
      this.$bvModal.msgBoxOk("Berhasil menambahkan siswa baru", {
        title: "Sukses",
        size: "sm",
        buttonSize: "sm",
        okVariant: "success",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
    showMessageCek(form) {
      this.$bvModal.msgBoxOk(`Form ${form} tidak boleh kosong`, {
        title: "Maaf",
        size: "sm",
        buttonSize: "sm",
        okVariant: "success",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
    showMessageCekPassword() {
      this.$bvModal.msgBoxOk(`Panjang Password minimal 8 karakter`, {
        title: "Maaf",
        size: "sm",
        buttonSize: "sm",
        okVariant: "success",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
    showMessageKonfir() {
      this.$bvModal.msgBoxOk("Tolong konfirmasi password anda", {
        title: "Maaf",
        size: "sm",
        buttonSize: "sm",
        okVariant: "success",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
    clearForm() {
      this.form.nama = "";
      this.form.username = "";
      this.form.kelas = "";
      this.form.jk = "";
      this.form.alamat = "";
      this.form.tempat_lahir = "";
      this.form.tanggal_lahir = "";
      this.form.hp = "";
      this.form.email = "";
      this.form.password = "";
      this.confirm_password = "";
    },
    async registration() {
      if (this.form.nama == "") {
        this.showMessageCek("Nama");
      } else if (this.form.username == "") {
        this.showMessageCek("Username");
      } else if (this.form.jk == "") {
        this.showMessageCek("Jenis kelamin");
      } else if (this.form.alamat == "") {
        this.showMessageCek("Alamat");
      } else if (this.form.tempat_lahir == "") {
        this.showMessageCek("Tempat lahir");
      } else if (this.form.tanggal_lahir == "") {
        this.showMessageCek("Tanggal lahir");
      } else if (this.form.hp == "") {
        this.showMessageCek("Nomor Hp");
      } else if (this.form.email == "") {
        this.showMessageCek("Email");
      } else if (this.form.password.length < 8) {
        this.showMessageCekPassword();
      } else if (this.isConfirmed()) {
        try {
          let data = await user.addSiswa(this.form);
          if (data.status == 200) {
            this.showMessageSukses();
            this.clearForm();
          }
        } catch (err) {
          logout.clear();
        }
      } else {
        this.showMessageKonfir();
      }
    },
  },
  mounted() {
    this.loadKelas();
  },
};
</script>
<style scoped>
.card-dest {
  margin-top: 30px;
}
</style>