import { Box, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
}

const NavLink = ({ children, to }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      as="button"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={() => navigate(to)}
    >
      {children}
    </Box>
  );
};

export default NavLink;
