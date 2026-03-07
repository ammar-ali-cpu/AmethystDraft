// Note: This component is currently not in use, but is a sidebar for the Research page in case it is added in the future :) <3
// import { Database, Star, BarChart3, GitCompare } from "lucide-react";
// import "./ResearchSidebar.css";

// interface ResearchSidebarProps {
//   selectedView: string;
//   onSelectView: (view: string) => void;
//   statBasis: "projections" | "last-year" | "3-year-avg";
//   onStatBasisChange: (basis: "projections" | "last-year" | "3-year-avg") => void;
// }

// export default function ResearchSidebar({ selectedView, onSelectView, statBasis, onStatBasisChange }: ResearchSidebarProps) {
//   const navigationItems = [
//     { id: "player-database", label: "Player Database", icon: Database },
//     { id: "watchlists", label: "Watchlists", icon: Star },
//     { id: "rankings", label: "Rankings", icon: BarChart3 },
//     { id: "compare", label: "Compare", icon: GitCompare },
//   ];

//   return (
//     <div className="research-sidebar">
//       <div className="sidebar-section">
//         <h3 className="sidebar-section-title">NAVIGATION</h3>
//         <div className="sidebar-nav">
//           {navigationItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 className={`sidebar-nav-item ${selectedView === item.id ? "active" : ""}`}
//                 onClick={() => onSelectView(item.id)}
//               >
//                 <Icon size={18} />
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="sidebar-section">
//         <h3 className="sidebar-section-title">STAT BASIS</h3>
//         <div className="sidebar-nav">
//           <button 
//             className={`sidebar-nav-item ${statBasis === "projections" ? "active" : ""}`}
//             onClick={() => onStatBasisChange("projections")}
//           >
//             Projections
//           </button>
//           <button 
//             className={`sidebar-nav-item ${statBasis === "last-year" ? "active" : ""}`}
//             onClick={() => onStatBasisChange("last-year")}
//           >
//             Last Year
//           </button>
//           <button 
//             className={`sidebar-nav-item ${statBasis === "3-year-avg" ? "active" : ""}`}
//             onClick={() => onStatBasisChange("3-year-avg")}
//           >
//             3-Year Avg
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
