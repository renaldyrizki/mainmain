// "use client";

// import { useAudio } from "@/contexts/AudioContext";

// export default function AudioButton() {
//   const { playing, toggle } = useAudio();

//   return (
//     <button
//       onClick={toggle}
//       style={{
//         position: "fixed",
//         bottom: 16,
//         right: 16,
//         width: 44,
//         height: 44,
//         borderRadius: "50%",
//         background: "#111827",
//         color: "white",
//         border: "none",
//         fontSize: 18,
//         cursor: "pointer",
//       }}
//       aria-label="Audio toggle"
//     >
//       {playing ? "⏸" : "▶"}
//     </button>
//   );
// }
