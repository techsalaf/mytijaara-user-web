import { useRouter } from "next/router";
import { styled } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import NextImage from "components/NextImage";
import { getModuleId } from "helper-functions/getModuleId";

export const Logo = styled("div")(({ height, width }) => ({
  maxWidth: width,
  height: height,

  position: "relative",
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
const CustomLogo = ({ logoImg, atlText, height, width, objectFit }) => {
  const router = useRouter();
  let location = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
  }
  // GEMINI-MYTJ: Storefront-first - clicking logo always navigates to storefront
  const handleClick = () => {
    const queryModule = router?.query?.module || router?.query?.module_id;
    const moduleValue = Array.isArray(queryModule)
      ? queryModule[0]
      : queryModule || getModuleId();
    const targetModule =
      moduleValue ||
      (typeof window !== "undefined"
        ? localStorage.getItem("selectedModuleIdentifier") ||
          JSON.parse(localStorage.getItem("module") || "null")?.slug ||
          "shop"
        : "shop");
    const homeHref = {
      pathname: "/home",
      query: { module: String(targetModule) },
    };
    router.replace(homeHref, undefined, { shallow: true });
  };
  return (

    <Logo height={height} width={width} onClick={() => handleClick()}>
      <NextImage
        src={logoImg}
        alt={atlText}
        objectFit={objectFit ? objectFit : "contain"}
        loading="eager"
        width={100}
        height={70}
      />
    </Logo>
  );
};
export default CustomLogo;
