import React, { useEffect, useState } from "react";
import { BiError, BiHistory, BiSelectMultiple } from "react-icons/bi";
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
} from "react-icons/gi";
import {
  faMeteor,
  faIdCard,
  faDragon,
  faMapMarkedAlt,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdEvent } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { recivePromiseByAttributeCount } from "../../services/DatabaseService";

interface $Props {
  type: string;
  name: string;
}

const LinkCheck = ({ type, name }: $Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [entitiyFound, setEntity] = useState<boolean>(false);

  useEffect(() => {
    if (type === "dice") {
      setEntity(true);
      setLoading(false);
    } else {
      let newType = type + "s";
      if (type === "class" || type === "subclass") newType = type + "es";
      recivePromiseByAttributeCount(newType, "name", name).then((count: number) => {
        setEntity(count > 0);
        setLoading(false);
      });
    }
  }, [type, name]);

  const formatIcon = (type: string) => {
    switch (type) {
      case "spell":
        return <FontAwesomeIcon icon={faMeteor} />;
      case "item":
        return <GiCrystalWand />;
      case "gear":
        return <GiBackpack />;
      case "race":
      case "subrace":
        return <GiWomanElfFace />;
      case "class":
      case "subclass":
        return <GiPlagueDoctorProfile />;
      case "selection":
        return <BiSelectMultiple />;
      case "char":
        return <FontAwesomeIcon icon={faIdCard} />;
      case "monster":
        return <FontAwesomeIcon icon={faDragon} />;
      case "encounter":
        return <GiSwordClash />;
      case "campaign":
        return <GiBookmarklet />;
      case "quest":
        return <GiScrollUnfurled />;
      case "event":
        return <MdEvent />;
      case "world":
        return <GiSolarSystem />;
      case "location":
        return <FontAwesomeIcon icon={faMapMarkedAlt} />;
      case "npc":
        return <GiDjinn />;
      case "randomTable":
        return <FontAwesomeIcon icon={faTable} />;
      case "book":
        return <GiBookshelf />;
      case "group":
        return <HiUserGroup />;
      case "dice":
        return <GiDiceTwentyFacesTwenty />;
      default:
        return "";
    }
  };

  return (
    <>
      {loading && <BiHistory />}
      {!loading && !entitiyFound && <BiError />}
      {!loading && entitiyFound && <>{formatIcon(type)}</>}
    </>
  );
};

export default LinkCheck;
