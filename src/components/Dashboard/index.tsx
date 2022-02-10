import { Summary } from "../Summary";
import { TransactionTables } from "../TransactionTables";
import { Container } from "./styles";

export function Dashboar(){
  return (
    <Container>
      <Summary/>
      <TransactionTables/>
    </Container>
  );
}