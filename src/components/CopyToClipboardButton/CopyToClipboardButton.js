import { Button } from "@chakra-ui/react";
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function CopyToClipboardButton(props) {
  const { innerText, copyThisToClipboard } = props;

  return (
    <Button leftIcon={<HiOutlineClipboardCopy />} onClick={() => navigator.clipboard.writeText(copyThisToClipboard)}
      _active={{
        bg: 'green.300',
        transform: 'scale(0.9)',
        borderColor: 'green.300',
      }}
      _hover={{ bg: 'green.700' }}
    >
      {innerText}
    </Button>
  );
}


