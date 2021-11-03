import { BiSelectMultiple } from "react-icons/bi";
import {
  GiCrystalWand,
  GiBackpack,
  GiWomanElfFace,
  GiPlagueDoctorProfile,
  GiSwordClash,
  GiBookmarklet,
  GiScrollUnfurled,
  GiSolarSystem,
  GiDjinn,
  GiBookshelf,
  GiDiceTwentyFacesTwenty,
  GiBindle,
  GiSherlockHolmes,
  GiStabbedNote,
} from "react-icons/gi";
import { FaMeteor, FaIdCard, FaDragon, FaMapMarkedAlt, FaTable } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

interface $Props {
  type: string;
}

const LinkCheck = ({ type }: $Props) => {
  const formatIcon = (type: string) => {
    switch (type) {
      case "spell":
        return <FaMeteor />;
      case "item":
        return <GiCrystalWand />;
      case "gear":
        return <GiBackpack />;
      case "race":
      case "subrace":
        return <GiWomanElfFace />;
      case "class":
      case "subclass":
      case "classe":
      case "subclasse":
        return <GiPlagueDoctorProfile />;
      case "selection":
        return <BiSelectMultiple />;
      case "char":
        return <FaIdCard />;
      case "monster":
        return <FaDragon />;
      case "encounter":
        return <GiSwordClash />;
      case "campaign":
        return <GiBookmarklet />;
      case "quest":
        return <GiStabbedNote />;
      case "note":
        return <GiScrollUnfurled />;
      case "event":
        return <MdEvent />;
      case "world":
        return <GiSolarSystem />;
      case "location":
        return <FaMapMarkedAlt />;
      case "npc":
        return <GiDjinn />;
      case "randomTable":
        return <FaTable />;
      case "book":
        return <GiBookshelf />;
      case "group":
        return <HiUserGroup />;
      case "feat":
        return <GiBindle />;
      case "background":
        return <GiSherlockHolmes />;
      case "dice":
        return <GiDiceTwentyFacesTwenty />;
      default:
        return <></>;
    }
  };

  return formatIcon(type);
};

export default LinkCheck;
