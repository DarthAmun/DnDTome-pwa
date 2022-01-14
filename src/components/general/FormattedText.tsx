import { ReactNodeArray } from "hoist-non-react-statics/node_modules/@types/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formating } from "../../services/TextService";

interface $Props {
  text: string;
}

const FormattedText = ({ text }: $Props) => {
  const [formatted, setText] = useState<ReactNodeArray>([]);

  useEffect(() => {
    setText(formating(text));
  }, [text]);

  return <FormatedTextContainer>{formatted}</FormatedTextContainer>;
};

export default FormattedText;

const FormatedTextContainer = styled.div`
  line-height: 20px;
  white-space: pre-line;
`;
