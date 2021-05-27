import sys
import json
from service import SPService
from parser import SPParser

if __name__ == "__main__":

    sys.argv.pop(0)

    try:
        if len(sys.argv) == 2:
            debt_option = 'all'
            license_plate = sys.argv[0]
            renavam = sys.argv[1]

        elif len(sys.argv) == 3:
            debt_option = sys.argv[0]
            license_plate = sys.argv[1]
            renavam = sys.argv[2]

        assert len(sys.argv) in range(2, 4)
    except (AssertionError, IndexError):
        print("Argumentos inválidos")
        sys.exit(1)

    service = SPService(
        license_plate=license_plate,
        renavam=renavam,
        debt_option=debt_option
    )

    try:
        search_result = service.debt_search()
    except Exception as exc:
        print(exc)
        sys.exit(1)

    parser = SPParser(search_result)
    result = parser.parse_data()

    print(
        json.dumps(result, indent=4, ensure_ascii=False)
    )
    sys.exit(0)
