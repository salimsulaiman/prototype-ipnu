import { Autocomplete, AutocompleteItem, Button, Form, Input, Radio, RadioGroup, Spinner } from "@heroui/react";
import axios from "axios";
import { useEffect, useRef, useState, type ReactHTMLElement } from "react";

type Sekolah = {
  id: number;
  name: string;
};

type Provinsi = {
  id: number;
  name: string;
};

type Kabupaten = {
  id: number;
  name: string;
};

type Kecamatan = {
  id: number;
  name: string;
};

type Desa = {
  id: number;
  name: string;
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputSPRef = useRef<HTMLInputElement>(null);
  const [fileSPName, setFileSPName] = useState<string | null>(null);
  const [previewSPUrl, setPreviewSPUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // Buat URL untuk preview gambar
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setFileName(null);
      setPreviewUrl(null);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // bersihkan URL blob
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input file
    }
  };

  const handleRemoveSPFile = () => {
    setFileSPName(null);
    if (previewSPUrl) {
      URL.revokeObjectURL(previewSPUrl); // bersihkan URL blob
    }
    setPreviewSPUrl(null);
    if (fileInputSPRef.current) {
      fileInputSPRef.current.value = ""; // reset input file
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewSPUrl) {
        URL.revokeObjectURL(previewUrl);
        URL.revokeObjectURL(previewSPUrl);
      }
    };
  }, [previewUrl, previewSPUrl]);

  const handleSPButtonClick = () => {
    fileInputSPRef.current?.click();
  };

  const handleSPFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSPName(file.name);

      // Buat URL untuk preview gambar
      const imageSPUrl = URL.createObjectURL(file);
      setPreviewSPUrl(imageSPUrl);
    } else {
      setFileSPName(null);
      setPreviewSPUrl(null);
    }
  };

  const [sekolah, setSekolah] = useState([
    {
      id: 1,
      name: "SMK NEGERI 1 Slawi",
    },
    {
      id: 2,
      name: "MTS Slawi",
    },
    {
      id: 3,
      name: "MTS Babakan",
    },
  ]);

  const [selectedSekolah, setSelectedSekolah] = useState<Sekolah | null>(null);

  // const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  // const [selectedProvinsi, setSelectedProvinsi] = useState<Provinsi | null>(null);

  // const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState<Kabupaten | null>(null);

  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(null);

  const [desa, setDesa] = useState<Desa[]>([]);
  const [selectedDesa, setSelectedDesa] = useState<Desa | null>(null);

  const [fullname, setFullname] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");

  // let address = `${selectedDesa?.name}, ${selectedKecamatan?.name}, ${selectedKabupaten?.name}, ${selectedProvinsi?.name}`;

  const [selectedRadio, setSelectedRadio] = useState("pac");

  // useEffect(() => {
  //   axios
  //     .get("https://back-end-acara-ten-chi.vercel.app/api/regions")
  //     .then(function (response) {
  //       setProvinsi(response.data.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://back-end-acara-ten-chi.vercel.app/api/regions/${selectedProvinsi?.id}/province`)
  //     .then(function (response) {
  //       setKabupaten(response.data.data[0].regencies);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }, [selectedProvinsi]);

  useEffect(() => {
    axios
      .get(`https://back-end-acara-ten-chi.vercel.app/api/regions/3328/regency`)
      .then(function (response) {
        setKecamatan(response.data.data[0].districts);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [selectedKabupaten]);

  useEffect(() => {
    axios
      .get(`https://back-end-acara-ten-chi.vercel.app/api/regions/${selectedKecamatan?.id}/district`)
      .then(function (response) {
        setDesa(response.data.data[0].villages);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [selectedKecamatan]);

  let wilayah = "";

  if (selectedRadio === "pac") {
    wilayah;
  } else if (selectedRadio === "pr") {
    wilayah = selectedDesa?.name || "";
  } else {
    wilayah = selectedSekolah?.name || "";
  }

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("nama", fullname);
    formData.append("nik", nik);
    formData.append("telpon", phone);
    formData.append("kategori", selectedRadio);
    formData.append("kecamatan", selectedKecamatan?.name || "");
    formData.append("wilayah", wilayah);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzhvUPlmz4ja-F8avY-d4vNA0kXyMJ13PUxKc9kslOWkla36lY5oeCfS2f8gvYPvC_48w/exec",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.text();
      alert("success mengirim data");
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal mengirim:", error);
      alert("Terjadi kesalahan.");
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-slate-100 h-[480px] flex items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-slate-800">IPNU</h1>
      </div>
      <div className="w-full px-8 py-16 mx-auto max-w-7xl">
        <Form className="flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            errorMessage="Harap masukan nama lengkap"
            label="Nama Lengkap"
            labelPlacement="outside"
            name="fullname"
            placeholder="Masukan nama lengkap"
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />

          <Input
            isRequired
            errorMessage="Harap masukan nik"
            label="NIK"
            labelPlacement="outside"
            name="nik"
            placeholder="Masukan NIK"
            type="text"
            onChange={(e) => setNik(e.target.value)}
            value={nik}
          />

          <Input
            isRequired
            errorMessage="Harap masukan no telepon"
            label="No Telepon"
            labelPlacement="outside"
            name="phone"
            placeholder="Masukan no telepon"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <div className="space-y-2">
            <div className="font-semibold">Pilih:</div>

            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pac"
                  checked={selectedRadio === "pac"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <span>PAC</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pr"
                  checked={selectedRadio === "pr"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <span>PR</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pk"
                  checked={selectedRadio === "pk"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <span>PK/PT</span>
              </label>

              {/* <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pt"
                  checked={selectedRadio === "pt"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <span>PT</span>
              </label> */}
            </div>
          </div>

          {/* <Autocomplete
            className="max-w-xs"
            label="Select Provinsi"
            onSelectionChange={(key) => {
              const selected = provinsi.find((item) => item.id.toString() === key);
              setSelectedProvinsi(selected);
            }}
          >
            {provinsi.map((pronvinsi) => (
              <AutocompleteItem key={pronvinsi.id}>{pronvinsi.name}</AutocompleteItem>
            ))}
          </Autocomplete> */}

          {/* <Autocomplete
            className="max-w-xs"
            label="Select Kabupaten"
            isDisabled={kabupaten.length === 0}
            onSelectionChange={(key) => {
              const selected = kabupaten.find((item) => item.id.toString() === key);
              setSelectedKabupaten(selected);
            }}
          >
            {kabupaten.map((kabupaten) => (
              <AutocompleteItem key={kabupaten?.id}>{kabupaten.name}</AutocompleteItem>
            ))}
          </Autocomplete> */}

          <Autocomplete
            className="max-w-xs"
            label="Select Kecamatan"
            isDisabled={kecamatan.length === 0}
            onSelectionChange={(key) => {
              const selected = kecamatan.find((item) => item.id.toString() === key);
              if (selected) {
                setSelectedKecamatan(selected);
              } else {
                setSelectedKecamatan(null); // jika tidak ketemu, bisa reset
              }
            }}
          >
            {kecamatan.map((kecamatan) => (
              <AutocompleteItem key={kecamatan?.id}>{kecamatan.name}</AutocompleteItem>
            ))}
          </Autocomplete>

          {selectedRadio === "pr" && (
            <Autocomplete
              className="max-w-xs"
              label="Select Desa"
              isDisabled={desa.length === 0}
              onSelectionChange={(key) => {
                const selected = desa.find((item) => item.id.toString() === key);
                if (selected) {
                  setSelectedDesa(selected);
                } else {
                  setSelectedDesa(null);
                }
              }}
            >
              {desa.map((desa) => (
                <AutocompleteItem key={desa?.id}>{desa.name}</AutocompleteItem>
              ))}
            </Autocomplete>
          )}
          {selectedRadio === "pk" && (
            <Autocomplete
              className="max-w-xs"
              label="Pilih Sekolah"
              isDisabled={desa.length === 0}
              onSelectionChange={(key) => {
                const selected = sekolah.find((item) => item.id.toString() === key);
                if (selected) {
                  setSelectedSekolah(selected);
                } else {
                  setSelectedSekolah(null);
                }
              }}
            >
              {sekolah.map((sekolah) => (
                <AutocompleteItem key={sekolah?.id}>{sekolah.name}</AutocompleteItem>
              ))}
            </Autocomplete>
          )}

          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">Pilih Pas Foto</label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full mt-3 border border-gray-200 shadow-sm rounded-xl max-h-64"
              />
            )}
            {fileName && (
              <div className="flex items-center justify-between my-3">
                <p className="text-sm text-gray-600 truncate">
                  📁 <span className="font-medium">{fileName}</span>
                </p>
                <button onClick={handleRemoveFile} type="button" className="ml-2 text-sm text-red-600 hover:underline">
                  Hapus
                </button>
              </div>
            )}

            <div
              onClick={handleButtonClick}
              className="flex items-center justify-center px-4 py-2 transition border border-gray-300 border-dashed cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4m0 0l4-4m-4 4v12" />
              </svg>
              <span className="text-sm text-gray-600">{fileName ? "Ganti File" : "Pilih File"}</span>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
          </div>
          {selectedRadio === "pac" && (
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">Surat Pengesahan</label>
              {previewSPUrl && (
                <img
                  src={previewSPUrl}
                  alt="Preview"
                  className="object-cover w-full mt-3 border border-gray-200 shadow-sm rounded-xl max-h-64"
                />
              )}
              {fileSPName && (
                <div className="flex items-center justify-between my-3">
                  <p className="text-sm text-gray-600 truncate">
                    📁 <span className="font-medium">{fileSPName}</span>
                  </p>
                  <button
                    onClick={handleRemoveSPFile}
                    type="button"
                    className="ml-2 text-sm text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              )}

              <div
                onClick={handleSPButtonClick}
                className="flex items-center justify-center px-4 py-2 transition border border-gray-300 border-dashed cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4m0 0l4-4m-4 4v12" />
                </svg>
                <span className="text-sm text-gray-600">{fileName ? "Ganti File" : "Pilih File"}</span>
                <input type="file" ref={fileInputSPRef} onChange={handleSPFileChange} className="hidden" />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              color="primary"
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center disabled:bg-blue-400"
            >
              {isLoading ? <Spinner size="sm" color="white" /> : "Send"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;
