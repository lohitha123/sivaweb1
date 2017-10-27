Imports System

Module CSHA256


    Private Const BITS_TO_A_BYTE = 8
    Private Const BYTES_TO_A_WORD = 4
    Private Const BITS_TO_A_WORD = 32



    Private m_lOnBits() As Long = {CLng(1), CLng(3), CLng(7), CLng(15), CLng(31), CLng(63), _
                                    CLng(127), CLng(255), CLng(511), CLng(1023), CLng(2047), _
                                    CLng(4095), CLng(8191), CLng(16383), CLng(32767), CLng(65535), _
                                    CLng(131071), CLng(262143), CLng(524287), CLng(1048575), _
                                    CLng(2097151), CLng(4194303), CLng(8388607), CLng(16777215), _
                                    CLng(33554431), CLng(67108863), CLng(134217727), CLng(268435455), _
                                    CLng(536870911), CLng(1073741823), CLng(2147483647)}

    Private m_l2Power() As Long = {CLng(1), CLng(2), CLng(4), CLng(8), CLng(16), CLng(32), _
                                   CLng(64), CLng(128), CLng(256), CLng(512), CLng(1024), _
                                   CLng(2048), CLng(4096), CLng(8192), CLng(16384), CLng(32768), _
                                   CLng(65536), CLng(131072), CLng(262144), CLng(524288), _
                                   CLng(1048576), CLng(2097152), CLng(4194304), CLng(8388608), _
                                   CLng(16777216), CLng(33554432), CLng(67108864), CLng(134217728), _
                                   CLng(268435456), CLng(536870912), CLng(1073741824)}

    Private K() As Long = {&H428A2F98, &H71374491, &HB5C0FBCF, &HE9B5DBA5, &H3956C25B, &H59F111F1, _
                        &H923F82A4, &HAB1C5ED5, &HD807AA98, &H12835B01, &H243185BE, &H550C7DC3, _
                        &H72BE5D74, &H80DEB1FE, &H9BDC06A7, &HC19BF174, &HE49B69C1, &HEFBE4786, _
                        &HFC19DC6, &H240CA1CC, &H2DE92C6F, &H4A7484AA, &H5CB0A9DC, &H76F988DA, _
                        &H983E5152, &HA831C66D, &HB00327C8, &HBF597FC7, &HC6E00BF3, &HD5A79147, _
                        &H6CA6351, &H14292967, &H27B70A85, &H2E1B2138, &H4D2C6DFC, &H53380D13, _
                        &H650A7354, &H766A0ABB, &H81C2C92E, &H92722C85, &HA2BFE8A1, &HA81A664B, _
                        &HC24B8B70, &HC76C51A3, &HD192E819, &HD6990624, &HF40E3585, &H106AA070, _
                        &H19A4C116, &H1E376C08, &H2748774C, &H34B0BCB5, &H391C0CB3, &H4ED8AA4A, _
                        &H5B9CCA4F, &H682E6FF3, &H748F82EE, &H78A5636F, &H84C87814, &H8CC70208, _
                        &H90BEFFFA, &HA4506CEB, &HBEF9A3F7, &HC67178F2}


    Private Function LShift(ByVal lValue, ByVal iShiftBits)
        If iShiftBits = 0 Then
            LShift = lValue
            Exit Function
        ElseIf iShiftBits = 31 Then
            If lValue And 1 Then
                LShift = &H80000000
            Else
                LShift = 0
            End If
            Exit Function
        ElseIf iShiftBits < 0 Or iShiftBits > 31 Then
            Err.Raise(6)
        End If

        If lValue And m_l2Power(31 - iShiftBits) Then
            LShift = ((lValue And m_lOnBits(31 - (iShiftBits + 1))) * m_l2Power(iShiftBits)) Or &H80000000
        Else
            LShift = ((lValue And m_lOnBits(31 - iShiftBits)) * m_l2Power(iShiftBits))
        End If
    End Function

    Private Function RShift(ByVal lValue, ByVal iShiftBits)
        If iShiftBits = 0 Then
            RShift = lValue
            Exit Function
        ElseIf iShiftBits = 31 Then
            If lValue And &H80000000 Then
                RShift = 1
            Else
                RShift = 0
            End If
            Exit Function
        ElseIf iShiftBits < 0 Or iShiftBits > 31 Then
            Err.Raise(6)
        End If

        RShift = (lValue And &H7FFFFFFE) \ m_l2Power(iShiftBits)

        If (lValue And &H80000000) Then
            RShift = (RShift Or (&H40000000 \ m_l2Power(iShiftBits - 1)))
        End If
    End Function

    Private Function AddUnsigned(ByVal lX, ByVal lY)
        Dim lX4
        Dim lY4
        Dim lX8
        Dim lY8
        Dim lResult

        lX8 = lX And &H80000000
        lY8 = lY And &H80000000
        lX4 = lX And &H40000000
        lY4 = lY And &H40000000

        lResult = (lX And &H3FFFFFFF) + (lY And &H3FFFFFFF)

        If lX4 And lY4 Then
            lResult = lResult Xor &H80000000 Xor lX8 Xor lY8
        ElseIf lX4 Or lY4 Then
            If lResult And &H40000000 Then
                lResult = lResult Xor &HC0000000 Xor lX8 Xor lY8
            Else
                lResult = lResult Xor &H40000000 Xor lX8 Xor lY8
            End If
        Else
            lResult = lResult Xor lX8 Xor lY8
        End If

        AddUnsigned = lResult
    End Function

    Private Function Ch(ByVal x, ByVal y, ByVal z)
        Ch = ((x And y) Xor ((Not x) And z))
    End Function

    Private Function Maj(ByVal x, ByVal y, ByVal z)
        Maj = ((x And y) Xor (x And z) Xor (y And z))
    End Function

    Private Function S(ByVal x, ByVal n)
        S = (RShift(x, (n And m_lOnBits(4))) Or LShift(x, (32 - (n And m_lOnBits(4)))))
    End Function

    Private Function R(ByVal x, ByVal n)
        R = RShift(x, CInt(n And m_lOnBits(4)))
    End Function

    Private Function Sigma0(ByVal x)
        Sigma0 = (S(x, 2) Xor S(x, 13) Xor S(x, 22))
    End Function

    Private Function Sigma1(ByVal x)
        Sigma1 = (S(x, 6) Xor S(x, 11) Xor S(x, 25))
    End Function

    Private Function Gamma0(ByVal x)
        Gamma0 = (S(x, 7) Xor S(x, 18) Xor R(x, 3))
    End Function

    Private Function Gamma1(ByVal x)
        Gamma1 = (S(x, 17) Xor S(x, 19) Xor R(x, 10))
    End Function

    Private Function ConvertToWordArray(ByVal sMessage)
        Dim lMessageLength As Int16
        Dim lNumberOfWords As Int16
        Dim lWordArray()
        Dim lBytePosition As Int16
        Dim lByteCount As Int16
        Dim lWordCount As Int16
        Dim lByte As Byte

        Const MODULUS_BITS = 512
        Const CONGRUENT_BITS = 448

        lMessageLength = Len(sMessage)

        lNumberOfWords = (((lMessageLength + ((MODULUS_BITS - CONGRUENT_BITS) \ BITS_TO_A_BYTE)) \ (MODULUS_BITS \ BITS_TO_A_BYTE)) + 1) * (MODULUS_BITS \ BITS_TO_A_WORD)
        ReDim lWordArray(lNumberOfWords - 1)

        lBytePosition = 0
        lByteCount = 0
        Do Until lByteCount >= lMessageLength
            lWordCount = lByteCount \ BYTES_TO_A_WORD

            lBytePosition = (3 - (lByteCount Mod BYTES_TO_A_WORD)) * BITS_TO_A_BYTE

            lByte = System.Text.ASCIIEncoding.ASCII.GetBytes(Mid(sMessage, lByteCount + 1, 1)).GetValue(0)

            lWordArray(lWordCount) = lWordArray(lWordCount) Or LShift(lByte, lBytePosition)
            lByteCount = lByteCount + 1
        Loop

        lWordCount = lByteCount \ BYTES_TO_A_WORD
        lBytePosition = (3 - (lByteCount Mod BYTES_TO_A_WORD)) * BITS_TO_A_BYTE

        lWordArray(lWordCount) = lWordArray(lWordCount) Or LShift(&H80, lBytePosition)

        lWordArray(lNumberOfWords - 1) = LShift(lMessageLength, 3)
        lWordArray(lNumberOfWords - 2) = RShift(lMessageLength, 29)

        ConvertToWordArray = lWordArray
    End Function

    Public Function SHA256(ByVal sMessage)
        Dim HASH(7)
        Dim M()
        Dim W(63)
        Dim a
        Dim b
        Dim c
        Dim d
        Dim e
        Dim f
        Dim g
        Dim h
        Dim i
        Dim j
        Dim T1
        Dim T2

        HASH(0) = &H6A09E667
        HASH(1) = &HBB67AE85
        HASH(2) = &H3C6EF372
        HASH(3) = &HA54FF53A
        HASH(4) = &H510E527F
        HASH(5) = &H9B05688C
        HASH(6) = &H1F83D9AB
        HASH(7) = &H5BE0CD19


        M = ConvertToWordArray(sMessage)

        For i = 0 To UBound(M) Step 16
            a = HASH(0)
            b = HASH(1)
            c = HASH(2)
            d = HASH(3)
            e = HASH(4)
            f = HASH(5)
            g = HASH(6)
            h = HASH(7)

            For j = 0 To 63
                If j < 16 Then
                    W(j) = M(j + i)
                Else
                    W(j) = AddUnsigned(AddUnsigned(AddUnsigned(Gamma1(W(j - 2)), W(j - 7)), Gamma0(W(j - 15))), W(j - 16))
                End If

                T1 = AddUnsigned(AddUnsigned(AddUnsigned(AddUnsigned(h, Sigma1(e)), Ch(e, f, g)), K(j)), W(j))
                T2 = AddUnsigned(Sigma0(a), Maj(a, b, c))

                h = g
                g = f
                f = e
                e = AddUnsigned(d, T1)
                d = c
                c = b
                b = a
                a = AddUnsigned(T1, T2)
            Next

            HASH(0) = AddUnsigned(a, HASH(0))
            HASH(1) = AddUnsigned(b, HASH(1))
            HASH(2) = AddUnsigned(c, HASH(2))
            HASH(3) = AddUnsigned(d, HASH(3))
            HASH(4) = AddUnsigned(e, HASH(4))
            HASH(5) = AddUnsigned(f, HASH(5))
            HASH(6) = AddUnsigned(g, HASH(6))
            HASH(7) = AddUnsigned(h, HASH(7))
        Next

        SHA256 = LCase(Right("00000000" & Hex(HASH(0)), 8) & Right("00000000" & Hex(HASH(1)), 8) & Right("00000000" & Hex(HASH(2)), 8) & Right("00000000" & Hex(HASH(3)), 8) & Right("00000000" & Hex(HASH(4)), 8) & Right("00000000" & Hex(HASH(5)), 8) & Right("00000000" & Hex(HASH(6)), 8) & Right("00000000" & Hex(HASH(7)), 8))
    End Function


    Public Function ComputeHash(ByVal pPwdUser As String) As String
        ComputeHash = CSHA256.SHA256(pPwdUser)
    End Function


End Module
