import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Wedding from "../components/Event/Wedding";
import Birthday from "../components/Event/Birthday";
import Anniversary from "../components/Event/Anniversary";
import KittyParty from "../components/Event/KittyParty";
import BabyShower from "../components/Event/BabyShower";
import RetirementParty from "../components/Event/RetirementParty";
import ThemeParty from "../components/Event/ThemeParty";
import ReunionParty from "../components/Event/ReunionParty";
import AlumuniParty from "../components/Event/AlumuniParty";
import Gallery from "../components/Gallery";
import Enquiry from "../components/Enquiry"
import Vlog from "../components/Vlog";
import Corporate from "../components/Event/corporateEvent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/events/wedding" element={<Wedding />} />
      <Route path="/events/birthday" element={<Birthday />} />
      <Route path="/events/anniversary" element={<Anniversary />} />
      <Route path="/events/KittyParty" element={<KittyParty />} />
      <Route path="/events/BabyShower" element={<BabyShower />} />
      <Route path="/events/RetirementParty" element={<RetirementParty />} />
      <Route path="/events/ThemeParty" element={<ThemeParty />} />
      <Route path="/events/ReunionParty" element={<ReunionParty />} />
      <Route path="/events/Corporate" element={<Corporate />} />
      <Route path="/events/AlumuniParty" element={<AlumuniParty />} />
      <Route path="/Gallery" element={<Gallery/>}/>
      <Route path="/Enquiry" element={<Enquiry/>}/>
      <Route path="/Vlog" element={<Vlog/>}/>
    </Routes>
  );
};

export default AppRoutes;
