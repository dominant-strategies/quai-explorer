import { IconButton } from "@chakra-ui/react";
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function CopyToClipboardButton(props) {
  const { copyThisToClipboard, size } = props;

  return (
    <IconButton size={size} aria-label='Copy to clipboard' icon={<HiOutlineClipboardCopy />} onClick={() => navigator.clipboard.writeText(copyThisToClipboard)}
      _active={{
        bg: 'green.300',
        transform: 'scale(0.9)',
        borderColor: 'green.500',
      }}
      _hover={{ bg: 'green.700' }}
    />
  );
}


