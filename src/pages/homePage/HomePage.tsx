import { Autocomplete, AutocompleteItem, Button, Form, Input, Radio, RadioGroup } from "@heroui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

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

  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<Provinsi | null>(null);

  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState<Kabupaten | null>(null);

  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(null);

  const [desa, setDesa] = useState<Desa[]>([]);
  const [selectedDesa, setSelectedDesa] = useState<Desa | null>(null);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("Fullname", fullname);
    // formData.append("Email", email);
    // formData.append("Phone", phone);
    // formData.append("Address", address);

    // fetch(
    //   "https://script.google.com/macros/s/AKfycbyup1or52N8COUN6Sn8TBuvVqbreSnxjpvJln2YB1-wqwz9zAOVzz04tXlaXbKSQK6E2g/exec",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     alert("Data berhasil dikirim");
    //     setFullname("");
    //     setEmail("");
    //     setPhone("");
    //     setSelectedProvinsi(null);
    //     setSelectedKabupaten(null);
    //     setSelectedKecamatan(null);
    //     setSelectedDesa(null);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("Gagal mengirim data");
    //   });
    alert("Terkirim");
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
            errorMessage="Please enter a valid fullname"
            label="Fullname"
            labelPlacement="outside"
            name="fullname"
            placeholder="Enter your fullname"
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />

          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <Input
            isRequired
            errorMessage="Please enter a valid phone"
            label="Phone"
            labelPlacement="outside"
            name="phone"
            placeholder="Enter your phone"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <div className="space-y-2">
            <div className="font-semibold">Select option:</div>

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

          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;
