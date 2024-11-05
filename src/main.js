// Definisi Class Buku
class Buku {
    constructor(judul, penulis, tahun) {
        this.judul = judul;
        this.penulis = penulis;
        this.tahun = tahun;
    }

    tampilkanInfo() {
        return `${this.judul} oleh ${this.penulis} (${this.tahun})`;
    }
}

// Array untuk menyimpan daftar buku dan buku favorit
let daftarBuku = [];
let bukuFavorit = [];

// Mengambil elemen DOM
const formTambahBuku = document.getElementById('form-tambah-buku');
const divDaftarBuku = document.getElementById('daftar-buku');
const divBukuFavorit = document.getElementById('buku-favorit');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');

// Event Listener untuk Form Tambah Buku
formTambahBuku.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahBuku();
});

// Fungsi untuk menambahkan buku ke daftar
function tambahBuku() {
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = parseInt(document.getElementById('tahun').value, 10);

    // Validasi input
    if (judul === '' || penulis === '' || isNaN(tahun)) {
        alert('Semua kolom harus diisi dengan benar!');
        return;
    }

    const bukuBaru = new Buku(judul, penulis, tahun);
    daftarBuku.push(bukuBaru);
    simpanDaftarBuku(); // Simpan daftar buku setelah menambahkan buku baru
    tampilkanDaftarBuku();
    formTambahBuku.reset();
}

// Fungsi untuk menyimpan daftar buku ke Local Storage
function simpanDaftarBuku() {
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
}

// Fungsi untuk menampilkan daftar buku
function tampilkanDaftarBuku() {
    divDaftarBuku.innerHTML = '';
    if (daftarBuku.length === 0) {
        divDaftarBuku.innerHTML = '<p class="text-gray-500">Daftar buku kosong</p>';
    } else {
        daftarBuku.forEach((buku, index) => {
            const divBuku = document.createElement('div');
            divBuku.classList.add('buku', 'border', 'border-gray-300', 'p-4', 'mb-4', 'rounded-lg', 'shadow-sm');
            divBuku.innerHTML = `
                <p class="text-indigo-700 font-semibold mb-2">${buku.tampilkanInfo()}</p>
                <button class="bg-indigo-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-indigo-600 transition" onclick="tambahKeFavorit(${index})">Tambah ke Favorit</button>
                <button class="bg-red-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-red-600 transition" onclick="hapusBuku(${index})">Hapus buku dari daftar</button>
            `;
            divDaftarBuku.appendChild(divBuku);
        });
    }
}

// Fungsi untuk menambahkan buku ke favorit
function tambahKeFavorit(index) {
    const buku = daftarBuku[index];

    // Cek apakah buku sudah ada di favorit
    const sudahAda = bukuFavorit.some(favBuku => {
        return favBuku.judul === buku.judul &&
               favBuku.penulis === buku.penulis &&
               favBuku.tahun === buku.tahun;
    });

    if (sudahAda) {
        alert('Buku ini sudah ada di daftar favorit!');
        return;
    }

    bukuFavorit.push(buku);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Fungsi untuk menghapus buku dari daftar dan juga favorit
function hapusBuku(index) {
    const buku = daftarBuku[index];
    daftarBuku.splice(index, 1);
    simpanDaftarBuku();
    tampilkanDaftarBuku();

    // Menghapus dari daftar favorit jika ada
    bukuFavorit = bukuFavorit.filter(favBuku => !(favBuku.judul === buku.judul && favBuku.penulis === buku.penulis && favBuku.tahun === buku.tahun));
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Fungsi untuk menyimpan buku favorit ke Local Storage
function simpanBukuFavorit() {
    localStorage.setItem('bukuFavorit', JSON.stringify(bukuFavorit));
}

// Fungsi untuk menampilkan buku favorit
function tampilkanBukuFavorit() {
    divBukuFavorit.innerHTML = '';

    if (bukuFavorit.length === 0) {
        divBukuFavorit.innerHTML = '<p class="text-gray-500">Daftar buku favorit kosong</p>';
    } else {
        bukuFavorit.forEach((buku, index) => {
            const divBuku = document.createElement('div');
            divBuku.classList.add('buku', 'border', 'border-gray-300', 'p-4', 'mb-4', 'rounded-lg', 'shadow-sm');
            divBuku.innerHTML = `
                <p class="text-indigo-700 font-semibold mb-2">${buku.tampilkanInfo()}</p>
                <button class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition" onclick="hapusDariFavorit(${index})">Hapus dari Favorit</button>
            `;
            divBukuFavorit.appendChild(divBuku);
        });
    }
}

// Fungsi untuk menghapus buku dari favorit
function hapusDariFavorit(index) {
    bukuFavorit.splice(index, 1);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

// Event Listener untuk tombol simpan nama pengguna
btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    localStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    document.getElementById('namaPengguna').value = '';
});

// Fungsi untuk menampilkan nama pengguna
function tampilkanNamaPengguna() {
    const nama = localStorage.getItem('namaPengguna');
    salamPengguna.textContent = nama ? `Selamat datang, ${nama}!` : '';
}

// Memuat data saat halaman dimuat
window.onload = function () {
    // Memuat daftar buku dari Local Storage
    if (localStorage.getItem('daftarBuku')) {
        daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')).map(book => new Buku(book.judul, book.penulis, book.tahun));
        tampilkanDaftarBuku();
    }

    // Memuat buku favorit dari Local Storage
    if (localStorage.getItem('bukuFavorit')) {
        bukuFavorit = JSON.parse(localStorage.getItem('bukuFavorit')).map(book => new Buku(book.judul, book.penulis, book.tahun));
        tampilkanBukuFavorit();
    }

    // Menampilkan nama pengguna dari Local Storage
    tampilkanNamaPengguna();
};
