class SPParser:
    def __init__(self, data):
        self.data = data

    def parse_data(self):
        """
        Faz o parse geral dos dados. De acordo com cada categoria de 
        débito (Multa, IPVA, etc..), utiliza a função específica para realizar o parse.
        """

        parsed_data = {}

        for debt_category in self.data:
            service = debt_category['Servico']

            if service == "Multas":
                parsed_data["Multas"] = self.parse_ticket(debt_category)
            elif service == "IPVA":
                parsed_data["IPVA"] = self.parse_ipva(debt_category)
            elif service == "DPVAT":
                parsed_data["DPVAT"] = self.parse_dpvat(debt_category)
            elif service == "Licenciamento":
                parsed_data["Licenciamento"] = self.parse_licensing(
                    debt_category)

        return parsed_data

    def parse_ipva(self, debts):
        """
        Faz o parse dos IPVAs.
        """

        debts_list = debts["IPVAs"]["IPVA"]
        parsed_debts = []

        for debt in debts_list:
            installment = debt.get('Cota', None)
            title = f"- Cota {'Única' if installment in [7, 8, 0] else installment}"

            parsed_debt = {
                'amount': float(debt.get('Valor'))/100,
                'description': f"IPVA {debt.get('Exercicio')}",
                'title': f"IPVA {title}",
                'type': 'ipva',
                'year': debt.get('Exercicio'),
            }

            if installment is not None:
                parsed_debt['installment'] = ['unique' if installment in
                                              [0, 7, 8] else installment]

                parsed_debts.append(parsed_debt)

        return parsed_debts

    def parse_ticket(self, debts):
        """
        Faz o parse das Multas.
        """

        debts_list = debts["Multas"]["Multa"]
        parsed_debts = []

        for debt in debts_list:
            parsed_debt = {
                'amount': float(debt.get('Valor'))/100,
                'auto_infraction': debt.get('AIIP').rstrip(),
                'description': debt.get('DescricaoEnquadramento'),
                'title': 'Infração de Trânsito',
                'type': "ticket",
            }

            parsed_debts.append(parsed_debt)

        return parsed_debts

    def parse_dpvat(self, debts):
        """
        Faz o parse dos DPVATs.
        """
        debts_list = debts["DPVATs"]["DPVAT"]
        parsed_debts = []

        for debt in debts_list:
            parsed_debt = {
                'amount': float(debt.get('Valor'))/100,
                'description': debt.get(
                    'DescricaoServico',
                    f"DPVAT {debt['Exercicio']}"
                ),
                'title': 'Seguro Obrigatório',
                'type': 'insurance',
                'year': debt.get('Exercicio'),
            }

            parsed_debts.append(parsed_debt)

        return parsed_debts

    def parse_licensing(self, debt):
        """
        Faz o parse dos Licenciamentos.
        """

        parsed_debt = {
            'amount': float(debt.get('TaxaLicenciamento'))/100,
            'description': debt.get(
                'DescricaoServico',
                f"Licenciamento {debt['Exercicio']}"
            ),
            'title': 'Licenciamento',
            'type': 'licensing',
            'year': debt.get('Exercicio'),
        }

        return [parsed_debt]
