const $ = (id) => document.getElementById(id);
const pinDialog = $("pinDialog");
const lockedDialog = $("lockedDialog");
let pin = sessionStorage.getItem("abysDemoPin") || "";
let stream = null;
let pinMode = "set";

function openPinDialog(mode) {
  pinMode = mode;
  $("pinTitle").textContent = mode === "set" ? "Buat PIN" : "Ganti PIN";
  $("pinDescription").textContent = "PIN demo 4–8 digit. Disimpan hanya di sesi browser ini.";
  $("pinInput").value = "";
  $("pinError").textContent = "";
  pinDialog.showModal();
}
$("setPin").addEventListener("click", () => openPinDialog(pin ? "change" : "set"));
$("pinForm").addEventListener("submit", (e) => {
  if (e.submitter?.value === "cancel") return;
  e.preventDefault();
  const value = $("pinInput").value;
  if (!/^\d{4,8}$/.test(value)) {
    $("pinError").textContent = "PIN harus terdiri dari 4–8 digit.";
    return;
  }
  pin = value;
  sessionStorage.setItem("abysDemoPin", pin);
  pinDialog.close();
  $("setPin").textContent = "Ganti PIN";
});
$("lockDevice").addEventListener("click", () => {
  if (!pin) { openPinDialog("set"); return; }
  $("unlockInput").value = "";
  $("unlockError").textContent = "";
  lockedDialog.showModal();
});
$("unlockForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("unlockInput").value === pin) lockedDialog.close();
  else $("unlockError").textContent = "PIN tidak cocok.";
});

async function stopCamera() {
  if (stream) stream.getTracks().forEach(track => track.stop());
  stream = null;
  $("camera").srcObject = null;
  $("camera").classList.remove("active");
  $("cameraPlaceholder").style.display = "block";
}
$("startCamera").addEventListener("click", async () => {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Kamera memerlukan HTTPS atau localhost pada browser yang mendukung.");
    }
    await stopCamera();
    stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}, audio: false});
    $("camera").srcObject = stream;
    $("camera").classList.add("active");
    $("cameraPlaceholder").style.display = "none";
  } catch (err) {
    $("cameraPlaceholder").style.display = "block";
    $("cameraPlaceholder").textContent = err.message || "Izin kamera tidak diberikan.";
  }
});
$("stopCamera").addEventListener("click", stopCamera);
window.addEventListener("pagehide", stopCamera);
