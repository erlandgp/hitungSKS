def calculate_gpa():
    # Grade point values
    grade_points = {
        'A': 4.0,
        'AB': 3.5,
        'B': 3.0,
        'BC': 2.5,
        'C': 2.0,
        'D': 1.0
    }
    
    print("=== Kalkulator IPK dan IPS ===")
    
    while True:
        try:
            current_gpa = float(input("Masukkan IPK saat ini: "))
            if not (0 <= current_gpa <= 4):
                raise ValueError("IPK harus antara 0 dan 4.")
            break
        except ValueError as e:
            print(f"Input tidak valid: {e}. Mohon masukkan angka yang benar.")

    while True:
        try:
            total_credits = int(input("Masukkan total SKS yang sudah diambil: "))
            if total_credits < 0:
                raise ValueError("Total SKS tidak boleh negatif.")
            break
        except ValueError as e:
            print(f"Input tidak valid: {e}. Mohon masukkan angka bulat yang benar.")

    total_quality_points = current_gpa * total_credits
    
    semester_courses = []
    
    while True:
        print("\nMasukkan detail mata kuliah baru (ketik 'selesai' untuk mengakhiri):")
        
        while True:
            course_credits_input = input("Jumlah SKS: ")
            if course_credits_input.lower() == 'selesai':
                break
            try:
                course_credits = int(course_credits_input)
                if course_credits <= 0:
                    raise ValueError("SKS harus lebih dari 0.")
                break
            except ValueError as e:
                print(f"Input tidak valid: {e}. Mohon masukkan angka bulat yang benar.")
        
        if course_credits_input.lower() == 'selesai':
            break

        while True:
            grade = input("Nilai (A/AB/B/BC/C/D): ").upper()
            if grade not in grade_points:
                print("Nilai tidak valid. Mohon masukkan A, AB, B, BC, C, atau D.")
            else:
                break
        
        semester_courses.append({'credits': course_credits, 'grade': grade})
        
        # Update total SKS and quality points for overall GPA
        total_quality_points += grade_points[grade] * course_credits
        total_credits += course_credits
        
        new_gpa = total_quality_points / total_credits if total_credits > 0 else 0
        print(f"IPK saat ini: {new_gpa:.2f}")

    if semester_courses:
        semester_total_credits = sum(c['credits'] for c in semester_courses)
        semester_quality_points = sum(grade_points[c['grade']] * c['credits'] for c in semester_courses)
        semester_gpa = semester_quality_points / semester_total_credits if semester_total_credits > 0 else 0
        print(f"\nIPS semester ini: {semester_gpa:.2f}")
    else:
        print("\nTidak ada mata kuliah baru yang ditambahkan.")

    final_gpa = total_quality_points / total_credits if total_credits > 0 else 0
    print(f"IPK Akhir: {final_gpa:.2f}")

if __name__ == "__main__":
    calculate_gpa()