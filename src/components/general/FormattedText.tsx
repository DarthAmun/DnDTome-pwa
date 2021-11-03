import { useState } from "react";
import styled from "styled-components";
import { formating } from "../../services/TextService";

interface $Props {
  text: string;
}

const FormattedText = ({ text }: $Props) => {
  const [formatted, setFormatted] = useState(formating(text));
  return <FormatedTextContainer>{formatted}</FormatedTextContainer>;
};

export default FormattedText;

const FormatedTextContainer = styled.div`
  line-height: 20px;
  white-space: pre-line;
`;
